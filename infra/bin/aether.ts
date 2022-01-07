#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GitHubBoostrapStack, GitHubBootstrapProps } from '../lib/stacks/Bootstrap';
import { PipelineStack, PipelineStackProps } from '../lib/stacks/Pipeline';
import { AetherStack } from '../lib/stacks/Aether';
import { getInfraEnv } from '../lib/InfraConfig';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CDK_DEFAULT_ACCOUNT: string;
      CDK_DEFAULT_REGION: string;
    }
  }
}

const pipelineProps: PipelineStackProps = {
  repo: 'UCF-Aether/Aether-App',
  branch: 'main',
};

const app = new cdk.App();
const {name, infraEnv} = getInfraEnv(app);
console.log(infraEnv);

// new GitHubBoostrapStack(app, 'GitHubBootstrap', {});
// new PipelineStack(app, 'Pipeline', pipelineProps);
new AetherStack(app, 'Aether', {
  env: infraEnv
});

app.synth();
