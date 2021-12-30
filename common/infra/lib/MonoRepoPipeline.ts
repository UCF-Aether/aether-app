import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Stack, StackProps, SecretValue, aws_codepipeline_actions as codepipeline_actions } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { CodePipeline, CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';

// TODO: trigger off of deploy
// TODO: write script to manually trigger build & print build badge url
// TODO: caching
// TODO: cfn outputs
// TODO: test reporting
// TODO: accept commands prop w/ defaults (auto cd to pathFilter)
// TODO: accept cdk deploy config props
// TODO: write proper docs for interface
export interface MonoRepoPipelineProps extends StackProps {
  repo: {
    name: string;
    owner: string;
    branch: string;
    tagFilter?: string;   // Doesn't filter tags by default
  };
  project: {
    name: string;   
    path?: string;  // Defaults to repo root directory
    additionalPaths?: [string];   // Local dependencies to include in the source-build artifact
    testReportFile?: string;
    // installCommands?: [string];
    // buildCommands?: [string];
    // testCommands?: [string];
    // synthCommands?: [string];
    // cdkTestCommands?: [string];
    cdkDir?: string;  // Relative to project.path, defaults 'cdk/'
  };
  // domainName: string;
  // stackDir: string;
  // clientCertificateArn: string;
  selfMutation: boolean;
  env: {
    account: string;
    region: string;
  };
  webhookFilters?: [codebuild.FilterGroup];   // Overrides filters (project path, repo tags, etc)
}

// TODO: separate codebuild for each build source (from filter group)
export class MonoRepoPipeline extends Stack {
  readonly pipeline: CodePipeline;
  readonly codebuildProject: codebuild.Project;

  constructor(scope: Construct, id: string, props: MonoRepoPipelineProps) {
    super(scope, id, props);

    const sourceBuildArtifactName = `${id}-${props.project.name}-sourcebuildartifact`;
    const projectPath = props.project.path || './';
    const projectCdkPath = `${projectPath}/${props.project.cdkDir || 'cdk'}`
    const codebuildComputeType = codebuild.ComputeType.SMALL;
    const codebuildBuildImage = codebuild.LinuxBuildImage.STANDARD_5_0;
    const sourcePaths = [`${projectPath}/**/*`];
    const jestReportFile = props.project.testReportFile || 'reports/jest-report.xml';

    if (props.project.additionalPaths) sourcePaths.concat(props.project.additionalPaths);

    // Credentials are global - only one per region allowed
    new codebuild.GitHubSourceCredentials(this, 'CodeBuildGitHubCreds', {
      accessToken: SecretValue.secretsManager('github-token'),
    });

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
        build: {
          commands: [
            'ls',
            `cd ${projectPath}`,
            'npm ci',
            'npm run build',
            'npm run test',
          ],
        },
      },
      reports: {
        jest_reports: {
          files: [jestReportFile],
          'file-format': 'JUNITXML'
        },
      },
    });

    const project = new codebuild.Project(this, 'SourceBuild', {
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
    this.pipeline = new CodePipeline(this, 'CodePipeline', {
      selfMutation: props.selfMutation,
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.s3(artifactBucket, sourceBuildArtifactName, {
          trigger: codepipeline_actions.S3Trigger.POLL,
        }),
        primaryOutputDirectory: `${projectCdkPath}/cdk.out`,
        commands: [
          'ls',
          `cd ${projectCdkPath}`,
          'npm ci',
          'npx cdk synth',
        ],
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

    // const prodStage = new ClientProdStage(this, 'ClientProd', props);
    // pipeline.addStage(prodStage);
  }
}
