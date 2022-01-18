import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, CodeBuildStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { ComputeType, BuildEnvironmentVariable, BuildEnvironmentVariableType } from "aws-cdk-lib/aws-codebuild";
import { IInfraEnvironment, infraConfig } from "../InfraConfig";
import { DeployStage } from "./stages/DeployStage";

export interface PipelineStackProps extends StackProps {
  envName: string;
  env: IInfraEnvironment;
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    let pipelineEnv: { [key: string]: BuildEnvironmentVariable } = {};
    Object.entries(props.env.pipeline.env || {}).forEach(([key, val]) => {
      if (val.startsWith("arn:")) {
        pipelineEnv[key] = { value: val, type: BuildEnvironmentVariableType.SECRETS_MANAGER };
      }
      else {
        pipelineEnv[key] = { value: val };
      }
    });

    const pipeline = new CodePipeline(this, "CodePipeline", {
      selfMutation: props.env.pipeline.selfMutation,
      synth: new CodeBuildStep("Synth", {
        input: CodePipelineSource.gitHub(infraConfig.repo, props.env.branch),
        installCommands: ["npm i -g pnpm"],
        commands: ["pnpm install", "pnpm build -r", "pnpm test -r", "pnpm synth --filter ./infra"],
        primaryOutputDirectory: "infra/cdk.out",
        buildEnvironment: {
          computeType: ComputeType.MEDIUM,
          environmentVariables: {
            DEPLOY_BRANCH: { value: props.env.branch },
            DEPLOY_ENV: { value: props.envName },
            ...pipelineEnv,
          },
        },
        rolePolicyStatements: [
          new PolicyStatement({
            actions: ["sts:AssumeRole"],
            resources: ["*"],
            conditions: {
              StringEquals: {
                "iam:ResourceTag/aws-cdk:bootstrap-role": "lookup",
              },
            },
          }),
        ],
      }),
    });

    pipeline.addStage(
      new DeployStage(this, "DeployStage", {
        env: props.env,
      })
    );
  }
}
