import * as sst from "@serverless-stack/resources";
import { InfraConfig, StageConfig } from "./infra/util/InfraConfig";
import { WebappStack } from "./infra/stacks/Webapp";
import { ApiStack } from "./infra/stacks/Api";
import { Runtime } from "aws-cdk-lib/aws-lambda";

import * as _config from "./infra.config.json";
import { IotStack } from "./infra/stacks/Iot";
import { VpcStack } from "./infra/stacks/Vpc";
import dotenv from "dotenv";
import { Cluster, TtsCommunityIntegrationStack } from "./infra/stacks/Tts";

const config = _config as InfraConfig;

export default function main(app: sst.App) {
  const stageConfig: StageConfig | undefined = config.stages[app.stage];
  const siteDomain = stageConfig?.domain || undefined;
  const apiDomain = siteDomain ? `api.${siteDomain}` : undefined;

  dotenv.config({ path: app.stage === "prod" ? ".env.prod" : ".env", override: true })
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  if (siteDomain) {
    console.log(`Using domain: ${siteDomain}`);
  } else {
    console.log("Using cloudfront domain");
  }

  if (apiDomain) {
    console.log(`Using api domain: ${apiDomain}`);
  } else {
    console.log("Using cloudfront api domain");
  }

  // Check for environment variables needed for lambdas
  const missingEnv: Array<string> = [];
  [
    "TTS_COMMUNITY_API_KEY",
    "SUPABASE_URL",
    "SUPABASE_PUBLIC_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "REACT_APP_GOOGLE_MAPS_API_KEY",
  ].forEach((env) => {
    if (!process.env[env]) missingEnv.push(env);
  });

  if (missingEnv.length > 0)
    throw new Error(`Missing environment variables: ${missingEnv}`);

  const vpcStack = new VpcStack(app, "Vpc");

  app.setDefaultFunctionProps((stack) => {
    const appVpc = vpcStack.vpc;
    // Secret values suck, and I'm losing my mind over this. Using process env (provided by user or github actions).
    // console.log(SecretValue.secretsManager("SupabaseSecrets"));

    return {
      runtime: Runtime.NODEJS_14_X,
      vpc: appVpc,
      vpcSubnets: { subnets: appVpc.privateSubnets },
      securityGroups: [vpcStack.sgs.lambda],
      environment: {
        SUPABASE_URL: process.env.SUPABASE_URL!,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      },
      bundle: {
        externalModules: ["pg-native"],
        installCommands: ["pnpm install"]
      },
    };
  });

  const api = new ApiStack(app, "Api", {
    vpc: vpcStack.vpc,
    containerPort: config.graphql.containerPort,
    domain: apiDomain,
    certificateArn: stageConfig
      ? config.dnsCertificates[apiDomain!]
      : undefined,
  });

  new WebappStack(app, "Webapp", {
    graphqlUrl: api.graphqlUrl,
    domain: siteDomain,
    certificateArn: stageConfig
      ? config.dnsCertificates[siteDomain!]
      : undefined,
  });

  // Using supabase - plugin other postgres rds // new DatabaseStack(app, "Database");

  new IotStack(app, "IoT", {});

  new TtsCommunityIntegrationStack(app, "TtsCommunityIntegration", {
    applicationId: "aether",
    applicationApiKey: process.env.TTS_COMMUNITY_API_KEY!,
    clusterAddress: Cluster.NAM1,
  });
}
