import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, ShellStep, CodePipelineSource } from "aws-cdk-lib/pipelines";

export interface PipelineStackProps extends StackProps {
  repo: string;
  branch: string;
}

export class PipelineStack extends Stack {
  protected readonly pipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    this.pipeline = new CodePipeline(this, 'CodePipeline', {
      selfMutation: false,  // TODO: configure from config manager
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(props.repo, props.branch),
        installCommands: [
          'npm i -g pnpm',
        ],
        commands: [
          'pnpm install',
          'pnpm build -r',
          'pnpm test -r',
          'pnpm synth',
        ],
      })
    });
  }

  addStage = this.pipeline.addStage;
  addWave = this.pipeline.addWave;
}
