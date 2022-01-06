import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Stack, StackProps, SecretValue, aws_codepipeline_actions as codepipeline_actions } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { CodePipeline, CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { IInfraConfiguration } from './InfraSettings';

// TODO: trigger off of deploy
// TODO: write script to manually trigger build & print build badge url
// TODO: caching
// TODO: cfn outputs
// TODO: accept cdk deploy config props
// TODO: write proper docs for interface

// export interface ProjectCommandProps {
//   preBuild: Array<string>;
//   install: [string];
//   build: [string];
//   test: [string];
//   synth: [string];
//   cdkTest: [string];
// }

export interface ProjectProps {
  name: string;   
  path?: string;  // Defaults to repo root directory
  additionalPaths?: [string];   // Local dependencies to include in the source-build artifact
  testReportFile?: string;
  // commands?: ProjectCommandProps;
  cdkDir?: string;  // Relative to project.path, defaults 'cdk/'
}

export interface MonoRepoProps {
  name: string;
  owner: string;
  branch: string;
  tagFilter?: string;   // Doesn't filter tags by default
}

export interface MonoRepoPipelineProps extends StackProps {
  repo: MonoRepoProps;
  project: ProjectProps;
  // domainName: string;
  // stackDir: string;
  // clientCertificateArn: string;
  selfMutation: boolean;
  // stages: [cdk.Stage];
  webhookFilters?: [codebuild.FilterGroup];   // Overrides filters (project path, repo tags, etc)
  config: IInfraConfiguration;
  env: {
    account: string;
    region: string;
  };
}

export class MonoRepoPipeline extends Stack {
  readonly pipeline: CodePipeline;

  readonly codebuildProject: codebuild.Project;

  readonly config: IInfraConfiguration;

  // TODO: make pnpm commands and migrate
  // static readonly NPM_COMMANDS = {
  //   preBuild: [],
  //   install: ['npm ci'],
  //   build: ['npm run build'],
  //   test: ['npm test'],
  //   synth: ['cdk synth'],
  //   cdkTest: ['npm test'],
  // };
  //
  // static readonly PNPM_COMMANDS = {
  //   preBuild: [],
  //   install: ['npm install -g pnpm'],
  //   build: ['pnpm install', 'pnpm build -w -r'],
  //   test: ['pnpm test -w -r'],
  //   synth: ['pnpm synth -w -r'],
  //   cdkTest: [],
  // };
  //
  static readonly RELEASE_TAGS = /^v\d+\.\d+(\.\d+)?$/.source;

  constructor(scope: Construct, id: string, props: MonoRepoPipelineProps) {
    super(scope, id, props);

    this.config = props.config;

    const idPrefix = `${props.project.name}-${id}`;
    const sourceBuildArtifactName = `${idPrefix}-sbartifact`;
    const projectPath = props.project.path || './';
    const projectCdkPath = `${projectPath}/${props.project.cdkDir || 'cdk'}`
    const codebuildComputeType = codebuild.ComputeType.SMALL;
    const codebuildBuildImage = codebuild.LinuxBuildImage.STANDARD_5_0;
    const sourcePaths = [
      `${projectPath}/build/**/*`,
      `${projectCdkPath}/**/*`,   // Need to include CDK files for synth step in the pipeline
    ];
    if (props.project.additionalPaths) sourcePaths.concat(props.project.additionalPaths);

    const relativeJestReportFile = props.project.testReportFile || 'reports/jest-report.xml';
    const jestReportFile = `${projectPath}/${relativeJestReportFile}`;

    // const defaultCommands = MonoRepoPipeline.PNPM_COMMANDS;
    // const commands = props.project.commands || defaultCommands;
    const commands = {
      install: [
        'npm i -g pnpm',
        'pnpm i -g aws-cdk',
      ],
      build: [
        'pnpm install',
        'pnpm build -r --filter ./common',
        `pnpm build -r --filter ./${projectPath}`,
        `pnpm synth -r --filter ./${projectPath}`,
        `pnpm test -r --filter ./${projectPath}`,
      ],
    };

    // const sourceBuildCommands: Array<string> = [
    //   `cd ${projectPath}`,
    //   ...commands.build,
    //   ...commands.test,
    // ];
    // const cdkBuildCommands: Array<string> = [
    //   `cd ${projectCdkPath}`,
    //   ...commands.synth,
    //   ...commands.cdkTest,
    // ];

    // Credentials are global - only one per region allowed
    // TODO: make part of bootstrap command with aws CLI
    // new codebuild.GitHubSourceCredentials(this, 'CodeBuildGitHubCreds', {
    //   accessToken: SecretValue.secretsManager('github-token'),
    // });

    let filterGroup = codebuild.FilterGroup
      .inEventOf(codebuild.EventAction.PUSH)
      .andBranchIs(props.repo.branch);

    if (props.project.path) filterGroup = filterGroup.andFilePathIs(props.project.path);
    if (props.repo.tagFilter) filterGroup = filterGroup.andTagIs(props.repo.tagFilter);

    const webhookFilters = props.webhookFilters || [filterGroup];

    const gitHubSource = codebuild.Source.gitHub({
      owner: props.repo.owner,
      repo: props.repo.name,
      branchOrRef: props.repo.branch,
      webhook: true, // optional, default: true if `webhookFilters` were provided, false otherwise
      fetchSubmodules: true,
      webhookTriggersBatchBuild: false,
      webhookFilters,
    });

    const artifactBucket = new s3.Bucket(this, 'ArtifactBucket', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true, // NOT recommended for production code
    });

    const sourceBuildSpec = codebuild.BuildSpec.fromObject({
      version: 0.2,
      artifacts: {
        files: sourcePaths,
        // 'base-directory': projectPath,
      },
      phases: {
        install: {
          commands: commands.install,
        },
        build: {
          commands: commands.build,
        },
      },
      reports: {
        jest_reports: {
          files: [jestReportFile],
          'file-format': 'JUNITXML'
        },
      },
    });

    const project = new codebuild.Project(this, `${idPrefix}-SourceBuild`, {
      // projectName: id + props.project.name + 'SourceBuild',
      source: gitHubSource,
      buildSpec: sourceBuildSpec,
      badge: true,
      artifacts: codebuild.Artifacts.s3({
        bucket: artifactBucket,
        includeBuildId: false,
        packageZip: true,
        name: sourceBuildArtifactName,  // Takes on name of buildspec
        // identifier: 'AddArtifact1',
      }),
      environment: {
        buildImage: codebuildBuildImage,
        computeType: codebuildComputeType,
      },
    });
    this.codebuildProject = project;
    artifactBucket.grantPut(project);

    // TODO: trigger synth input with s3 event instead of polling
    this.pipeline = new CodePipeline(this, `${idPrefix}-CodePipeline`, {
      selfMutation: props.selfMutation,
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.s3(artifactBucket, sourceBuildArtifactName, {
          trigger: codepipeline_actions.S3Trigger.POLL,
        }),
        primaryOutputDirectory: `${projectCdkPath}/cdk.out`,
        commands: [],
        rolePolicyStatements: [
          new iam.PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: ['*'],
            conditions: {
              StringEquals: {
                'iam:ResourceTag/aws-cdk:bootstrap-role': 'lookup',
              },
            },
          }),
        ],
      }),
      codeBuildDefaults: {
        partialBuildSpec: codebuild.BuildSpec.fromObject({
          version: 0.2
        }),
        buildEnvironment: {
          computeType: codebuildComputeType,
          buildImage: codebuildBuildImage,
        },
      },
    });

  }
}
