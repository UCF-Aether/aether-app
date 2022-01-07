import * as config from '../infra.config.json';
import { ContextProvider, App, Environment } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export enum DomainType {
  CloudFront = 'cloudfront',
  Route53 = 'route53',
};

export interface IInfraEnvironment extends Environment {
  account: string;
  region: string;
  domains: {
    type: DomainType;
    siteUrl?: string;   // Required if route53, must have dnsCertificateArn
    apiUrl?: string;    // Required if route53, must have dnsCertificateArn
  }
  branch?: string;
}

export interface IInfraConfig {
  [key: string]: string | number | boolean | {} | [];
  dnsCertificates: {[key: string]: string};
  environments: {[key: string]: IInfraEnvironment};
}

const infraConfig = config as IInfraConfig;
validateConfig(infraConfig);
export { infraConfig };

export function getInfraEnv(app: App): { name: string, infraEnv: IInfraEnvironment } {
  createDefaultConfig();
  const infraEnvName = getCurrentEnvironment(app);
  validateEnvironmentName(infraEnvName);
  const infraEnv = infraConfig.environments[infraEnvName];

  return { name: infraEnvName, infraEnv };
}

function createDefaultConfig() {
  const region = process.env.CDK_DEFAULT_REGION;
  const account = process.env.CDK_DEFAULT_ACCOUNT;
  const branch = process.env.DEPLOY_BRANCH || 'main';

  infraConfig.environments.default = {
    region,
    account,
    domains: { type: DomainType.CloudFront },
    branch,
  };
}

export function getDnsCertificateArn(domain: string): string {
  const dnsCertificates = infraConfig.dnsCertificates;
  if (!(domain in dnsCertificates)) {
    return "";
  }
  else {
    return dnsCertificates[domain];
  }
}

function getCurrentEnvironment(scope: Construct): string {
  const envContext = scope.node.tryGetContext('env');
  if (envContext === undefined) {
    return 'default';
  }
  else {
    return envContext as string;
  }
}

function validateEnvironmentConfig(config: IInfraEnvironment): void {
  const domains = config.domains;
  const type = domains.type;
  const isValid = type === DomainType.CloudFront ||
    type === DomainType.Route53 && 
    domains.apiUrl && domains.apiUrl.length > 0 &&
    domains.siteUrl && domains.siteUrl.length > 0;

  if (!isValid) throw new Error('"route53" domain types must have both siteUrl and apiUrl defined');
}

function validateEnvironmentName(name: string): void {
  if (Object.keys(infraConfig.environments).indexOf(name) < 0) {
    throw new Error(`Invalid environment name: ${name}. 
        Accepted values: ${Object.keys(infraConfig.environments)}`);
  }
}

export function validateConfig(config: IInfraConfig): void {
  Object.entries(config.environments).forEach(([env, config]) => {
    try {
      validateEnvironmentConfig(config);
    }
    catch (e) {
      throw new Error(`Error processing ${env} environment config: ${e.message}`);
    }
  })
}

