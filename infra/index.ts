import * as sst from "@serverless-stack/resources";
import dotenv from "dotenv";
import * as _config from "./infra.config.json";
import { WebappStack } from "./stacks/Webapp";
import { InfraConfig, StageConfig } from "./util/InfraConfig";


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
    "SUPABASE_SECRET_JWT",
    "MAPBOX_ACCESS_TOKEN",
    // "DATABASE_URL",
  ].forEach((env) => {
    if (!process.env[env]) missingEnv.push(env);
  });

  if (missingEnv.length > 0)
    throw new Error(`Missing environment variables: ${missingEnv}`);


  new WebappStack(app, "Webapp", {
    domain: siteDomain,
    certificateArn: stageConfig
      ? config.dnsCertificates[siteDomain!]
      : undefined,
  });

}
