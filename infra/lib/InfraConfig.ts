import { App, Environment } from "aws-cdk-lib";
import { Construct } from "constructs";

import * as _infraConfig from "../infra.config.json";

export enum DomainType {
  CloudFront = "cloudfront",
  Route53 = "route53",
}

export interface PipelineConfig {
  selfMutation: boolean;
}

export interface IInfraEnvironment extends Environment {
  account: string;
  region: string;
  pipeline: PipelineConfig;
  domains: {
    type: DomainType;
    siteUrl?: string; // Required if route53, must have dnsCertificateArn
    apiUrl?: string; // Required if route53, must have dnsCertificateArn
  };
  branch: string;
}

export interface IInfraConfig {
  [key: string]: string | number | boolean | {} | [];
  dnsCertificates: {
    [key: string]: string;
  };
  environments: {
    [key: string]: IInfraEnvironment;
  };
  repo: string;
}

function validateEnvironmentConfig(config: IInfraEnvironment): void {
  const { domains } = config;
  const { type } = domains;
  const isValid =
    type === DomainType.CloudFront ||
    (type === DomainType.Route53 &&
      domains.apiUrl &&
      domains.apiUrl.length > 0 &&
      domains.siteUrl &&
      domains.siteUrl.length > 0);

  if (!isValid) throw new Error('"route53" domain types must have both siteUrl and apiUrl defined');
}

export function validateConfig(config: IInfraConfig): void {
  Object.entries(config.environments).forEach(([env, envConfig]) => {
    try {
      validateEnvironmentConfig(envConfig);
    } catch (e) {
      throw new Error(`Error processing ${env} environment config: ${e.message}`);
    }
  });
}

const infraConfig: IInfraConfig = _infraConfig as IInfraConfig;
validateConfig(infraConfig);
export { infraConfig };

function createDefaultConfig() {
  const config = infraConfig.environments.default;
  const region = process.env.CDK_DEFAULT_REGION;
  const account = process.env.CDK_DEFAULT_ACCOUNT;
  const branch = process.env.DEPLOY_BRANCH;

  infraConfig.environments.default = {
    ...config,
    region,
    account,
    branch: branch || config.branch,
  };
}

function validateEnvironmentName(name: string): void {
  if (Object.keys(infraConfig.environments).indexOf(name) < 0) {
    throw new Error(`Invalid environment name: ${name}. 
        Accepted values: ${Object.keys(infraConfig.environments)}`);
  }
}

function getCurrentEnvironment(scope: Construct): string {
  const envContext = scope.node.tryGetContext("env");
  if (envContext === undefined) {
    return "default";
  }

  return envContext as string;
}

export function getInfraEnv(app: App): {
  name: string;
  infraEnv: IInfraEnvironment;
} {
  createDefaultConfig();
  const infraEnvName = getCurrentEnvironment(app);
  validateEnvironmentName(infraEnvName);
  const infraEnv = infraConfig.environments[infraEnvName];

  return {
    name: infraEnvName,
    infraEnv,
  };
}

export function getDnsCertificateArn(domain: string): string {
  const { dnsCertificates } = infraConfig;
  if (!(domain in dnsCertificates)) {
    return "";
  }

  return dnsCertificates[domain];
}
