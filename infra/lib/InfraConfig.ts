import {App, Environment, SecretValue} from "aws-cdk-lib";
import {Secret} from "aws-cdk-lib/aws-secretsmanager";
import {Construct} from "constructs";

import * as _infraConfig from "../infra.config.json";

export enum DomainType {
  CloudFront = "cloudfront",
  Route53 = "route53",
}

export interface PipelineConfig {
  selfMutation: boolean;
  env: {[key: string]: string};
}

export interface IInfraEnvironment extends Environment {
  account: string;
  region: string;
  pipeline: PipelineConfig;
  domains: {
    type: DomainType;
    siteUrl?: string; // Required if route53, must have dnsCertificateArn
    apiUrl?: string;  // Required if route53, must have dnsCertificateArn
  };
  branch: string;
  // This is messy lol
}

export interface IInfraConfig {
  [key: string]: string|number|boolean|{}|[];
  dnsCertificates: {[key: string]: string};
  environments: {[key: string]: IInfraEnvironment};
  repo: string;
}

function validateEnvironmentConfig(config: IInfraEnvironment): void {
  const {domains} = config;
  const {type} = domains;
  const isValid = type === DomainType.CloudFront ||
                  (type === DomainType.Route53 && domains.apiUrl &&
                   domains.apiUrl.length > 0 && domains.siteUrl &&
                   domains.siteUrl.length > 0);

  if (!isValid)
    throw new Error(
        '"route53" domain types must have both siteUrl and apiUrl defined');
}

export function validateConfig(config: IInfraConfig): void {
  Object.entries(config.environments).forEach(([ env, envConfig ]) => {
    try {
      validateEnvironmentConfig(envConfig);
    } catch (e) {
      throw new Error(
          `Error processing ${env} environment config: ${e.message}`);
    }
  });
}

function useOrGetEnv(value: string): string {
  if (value.charAt(0) === "$") {
    const envValue = process.env[value.slice(1)];
    console.log(envValue);
    // Throw if empty string, too.
    if (!envValue) {
      throw new Error(`Environment variable ${value} is undefined.`);
    }
    return envValue;
  }

  return value;
}

function processPipelineEnvVars(config: IInfraConfig) {
  Object.entries(config.environments).map(([ envName, envConfig ]) => {
    if (!envConfig.pipeline || !envConfig.pipeline.env)
      return;
    Object.entries(envConfig.pipeline.env).map(([ key, val ]) => {
      console.log(key, val);
      if (val.charAt(0) === "$") {
        const envKey = val.slice(1);
        const envVal = process.env[envKey];

        if (!envVal)
          throw new Error(`${envKey} is not defined`);

        envConfig.pipeline.env[envKey] = envVal;
      }
      // } else if (val.startsWith("arn:")) {
      //   console.log('Retrieving secret');
      //   const secretVal = SecretValue.secretsManager(val);
      //   envConfig.pipeline.env[key] = secretVal.toString();
      //   console.debug(envConfig.pipeline.env[key]);
      // }
    });
  });
}

const infraConfig: IInfraConfig = _infraConfig as IInfraConfig;
validateConfig(infraConfig);
processPipelineEnvVars(infraConfig);
export {infraConfig};

function createDefaultConfig() {
  const config = infraConfig.environments.default;
  // CDK_DEFAULT_REGION & CDK_DEFAULT_ACCOUNT are set by the CDK CLI.
  // These variables are set based on the AWS profile specified using the
  // --profile option, or the default AWS profile if you don't specify one.
  const region = useOrGetEnv(config.region);
  const account = useOrGetEnv(config.account);

  // MUST be set
  const branch = useOrGetEnv(config.branch);

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

export function getCurrentEnvironment(scope: Construct): string {
  const envContext = scope.node.tryGetContext("env");
  // Try to see if the env variable was set
  if (envContext === undefined) {
    const fromEnv = process.env.DEPLOY_ENV;
    if (fromEnv === undefined) {
      return "default";
    }
    return fromEnv;
  }

  return envContext as string;
}

export function getInfraEnv(app: App): {name: string; infraEnv : IInfraEnvironment} {
  const infraEnvName = getCurrentEnvironment(app);
  if (infraEnvName === "default") {
    createDefaultConfig();
    /* eslint no-console: off */
    console.log("Using default account");
  }
  validateEnvironmentName(infraEnvName);
  const infraEnv = infraConfig.environments[infraEnvName];

  return {
    name : infraEnvName,
    infraEnv,
  };
}

export function getDnsCertificateArn(domain: string): string {
  const {dnsCertificates} = infraConfig;
  if (!(domain in dnsCertificates)) {
    return "";
  }

  return dnsCertificates[domain];
}
