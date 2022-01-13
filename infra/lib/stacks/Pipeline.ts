import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { IInfraEnvironment, infraConfig } from "../InfraConfig";
import { DeployStage } from "./stages/DeployStage";

export interface PipelineStackProps extends StackProps {
  env: IInfraEnvironment;
}

export class PipelineStack extends Stack {
  static readonly commands = [
    "pnpm install",
    "pnpm build -r",
    "pnpm test -r",
    "pnpm synth --filter ./infra",
  ];

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "CodePipeline", {
      selfMutation: props.env.pipeline.selfMutation,
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(infraConfig.repo, props.env.branch),
        installCommands: ["npm i -g pnpm"],
        commands: PipelineStack.commands,
        primaryOutputDirectory: "infra/cdk.out",
      }),
    });

    pipeline.addStage(
      new DeployStage(this, "DeployStage", {
        env: props.env,
      })
    );
  }
}
