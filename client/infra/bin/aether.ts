#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ClientDeployStage, ClientDeployStageProps } from '../lib/ClientProdStage';
import { AetherWorkflowProps, AetherWorkflow } from 'infra-common/lib/AetherWorkflow';
import { Construct } from 'constructs';
import { IInfraConfiguration } from 'infra-common/lib/InfraSettings';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CDK_DEFAULT_ACCOUNT: string;
      CDK_DEFAULT_REGION: string;
    }
  }
}

const app = new cdk.App();

const clientDeployProps: Partial<ClientDeployStageProps> = {
  tags: {
    application: 'aether-client'
  }
};

const workflowProps: AetherWorkflowProps = {
  name: 'client',
  stages: [
    (scope: Construct, config: IInfraConfiguration) => {
     return new ClientDeployStage(scope, 'ClientDeployStage', {config, ...clientDeployProps});
    }
  ],
  selfMutation: false,
};
new AetherWorkflow(app, 'AetherClient', workflowProps);

app.synth();
