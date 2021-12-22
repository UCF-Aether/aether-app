import * as iam from 'aws-cdk-lib/aws-iam';
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CodePipeline, CodeBuildStep, CodePipelineSource } from "aws-cdk-lib/pipelines";
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
      // Uncomment line below to develop pipeline w/o committing to git
      selfMutation: false,
      pipelineName: 'AetherClientPipeline',
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.gitHub(props.ghRepo, 'main'),
        primaryOutputDirectory: 'cdk/cdk.out',
        commands: [
          'npm install',
          'npm run build',
          'npm run synth',
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
    });

   const prodStage = new FrontendProdStage(this, 'ProdStage', props);
    pipeline.addStage(prodStage);
  }
}
