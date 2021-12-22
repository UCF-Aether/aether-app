#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ClientPipeline } from '../lib/ClientPipeline';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CDK_DEFAULT_ACCOUNT: string;
      CDK_DEFAULT_REGION: string;
    }
  }
}

const app = new cdk.App();
new ClientPipeline(app, 'ClientPipeline', {
  clientCertificateArn: 'arn:aws:acm:us-east-1:831841410317:certificate/59c87649-994b-4808-b6aa-b8939b459223',
  ghRepo: 'UCF-Aether/Aether-Client',
  domainName: 'aethersensor.network',
  stackDir: '../',
  env: { 
    account: '831841410317',
    region: 'us-east-1',
  },
  tags: {
    application: 'Aether-Client',
  },
});

app.synth();
