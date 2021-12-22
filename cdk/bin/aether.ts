#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendPipeline } from '../lib/frontend-pipeline';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CDK_DEFAULT_ACCOUNT: string;
      CDK_DEFAULT_REGION: string;
    }
  }
}

const app = new cdk.App();
new FrontendPipeline(app, 'FrontendPipeline', {
  ghRepo: 'UCF-Aether/Aether-Client',
  domainName: 'aethersensor.network',
  stackDir: '../',
  env: { 
    account: '831841410317',
    region: 'us-east-1',
  },
  tags: {
    application: 'AetherClient',
  },
});
