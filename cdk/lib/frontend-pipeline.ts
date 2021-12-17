import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, ShellStep, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { FrontendProdStage } from "./frontend/deploy";

export interface FrontendProps extends StackProps {
  ghRepo: string;
  domainName: string;
  stackDir: string;
  env: {
    account: string;
    region: string;
  };
}

export class FrontendPipeline extends Stack {
  constructor(scope: Construct, id: string, props: FrontendProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(props.ghRepo, 'main'),
        commands: [
          'npm install',
          'npm ci',
          'npm run build-frontend',
          'cd cdk && npx cdk synth'
        ]
      }),
    });

   const prodStage = new FrontendProdStage(this, 'ProdStage', props);
    pipeline.addStage(prodStage);
  }
}
