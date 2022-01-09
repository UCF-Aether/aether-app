#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack, PipelineStackProps } from '../lib/stacks/Pipeline';
import { getInfraEnv, infraConfig } from '../lib/InfraConfig';
import { DeployStage } from '../lib/stacks/stages/DeployStage';
import { Stack } from 'aws-cdk-lib';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CDK_DEFAULT_ACCOUNT: string;
      CDK_DEFAULT_REGION: string;
    }
  }
}

const app = new cdk.App();
const {name, infraEnv} = getInfraEnv(app);
console.log(infraEnv);

// new GitHubBoostrapStack(app, 'GitHubBootstrap', {});
new PipelineStack(app, 'AetherApp', { env: infraEnv });

app.synth();
