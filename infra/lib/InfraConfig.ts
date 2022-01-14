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
  dnsCertificates: { [key: string]: string };
  environments: { [key: string]: IInfraEnvironment };
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

function useOrGetEnv(value: string): string {
  if (value.charAt(0) === "$") {
    const envValue = process.env[value.slice(1)];
    // Throw if empty string, too.
    if (!envValue) {
      throw new Error(`Environment variable ${value} is undefined.`);
    }
    return envValue;
  } else {
    return value;
  }
}

const infraConfig: IInfraConfig = _infraConfig as IInfraConfig;
validateConfig(infraConfig);
export { infraConfig };

function createDefaultConfig() {
  const config = infraConfig.environments.default;
  // CDK_DEFAULT_REGION & CDK_DEFAULT_ACCOUNT are set by the CDK CLI.
  // These variables are set based on the AWS profile specified using the
  // --profile option, or the default AWS profile if you don't specify one.
  const region = useOrGetEnv(config.region);
  const account = useOrGetEnv(config.account);

  // MUST be set
  let branch = useOrGetEnv(config.branch);

  infraConfig.environments.default = {
    ...config,
    region,
    account,
    branch,
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

export function getInfraEnv(app: App): { name: string; infraEnv: IInfraEnvironment } {
  createDefaultConfig();
  const infraEnvName = getCurrentEnvironment(app);
  if (infraEnvName === "default") {
    console.log("Using default account");
  }
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
