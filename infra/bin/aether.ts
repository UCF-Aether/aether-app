#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/stacks/Pipeline";
import { getInfraEnv } from "../lib/InfraConfig";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CDK_DEFAULT_ACCOUNT: string;
      CDK_DEFAULT_REGION: string;
    }
  }
}

const app = new cdk.App();
const { name, infraEnv } = getInfraEnv(app);
console.log(infraEnv);

// new GitHubBoostrapStack(app, 'GitHubBootstrap', {});
new PipelineStack(app, "AetherApp", { env: infraEnv, envName: name });

app.synth();
