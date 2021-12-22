import * as iam from 'aws-cdk-lib/aws-iam';
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { CodePipeline, CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { ClientProdStage } from './ClientProdStage';

export interface ClientProps extends StackProps {
  ghRepo: string;
  domainName: string;
  stackDir: string;
  clientCertificateArn: string;
  env: {
    account: string;
    region: string;
  };
}

export class ClientPipeline extends Stack {
  constructor(scope: Construct, id: string, props: ClientProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      // Uncomment line below to develop pipeline w/o committing to git
      // selfMutation: false,
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

    const prodStage = new ClientProdStage(this, 'ClientProd', props);
    pipeline.addStage(prodStage);
  }
}
