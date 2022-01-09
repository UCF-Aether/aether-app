import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, ShellStep, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { IInfraEnvironment, infraConfig } from "../InfraConfig";
import { DeployStage } from "./stages/DeployStage";

export interface PipelineStackProps extends StackProps {
  env: IInfraEnvironment;
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CodePipeline', {
      selfMutation: false,  // TODO: configure from config manager
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(infraConfig.repo, props.env.branch),
        installCommands: [
          'npm i -g pnpm',
        ],
        commands: [
          'pnpm install',
          'pnpm build -r',
          'pnpm test -r',
          'pnpm synth --filter ./infra',
        ],
      }),
    });

    pipeline.addStage(new DeployStage(this, 'DeployStage', {
      env: props.env,
    }));
  }
}
