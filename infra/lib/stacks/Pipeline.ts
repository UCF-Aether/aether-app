import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep, CodeBuildStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { IInfraEnvironment, infraConfig } from "../InfraConfig";
import { DeployStage } from "./stages/DeployStage";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export interface PipelineStackProps extends StackProps {
  envName: string;
  env: IInfraEnvironment;
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "CodePipeline", {
      selfMutation: props.env.pipeline.selfMutation,
      synth: new CodeBuildStep("Synth", {
        input: CodePipelineSource.gitHub(infraConfig.repo, props.env.branch),
        installCommands: ["npm i -g pnpm"],
        commands: ["pnpm install", "pnpm build -r", "pnpm test -r", "pnpm synth --filter ./infra"],
        primaryOutputDirectory: "infra/cdk.out",
        buildEnvironment: {
          environmentVariables: {
            DEPLOY_BRANCH: { value: props.env.branch },
            DEPLOY_ENV: { value: props.envName },
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
