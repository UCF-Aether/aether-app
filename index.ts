import * as sst from "@serverless-stack/resources";
import { InfraConfig, StageConfig } from "./infra/util/InfraConfig";
import { WebappStack } from "./infra/stacks/Webapp";
import { ApiStack } from "./infra/stacks/Api";
import { Runtime } from "aws-cdk-lib/aws-lambda";

import * as _config from "./infra.config.json";
import { DatabaseStack } from "./infra/stacks/Database";
import { IotStack } from "./infra/stacks/Iot";
import { VpcStack } from "./infra/stacks/Vpc";
import { FunctionProps } from "@serverless-stack/resources";
const config = _config as InfraConfig;

export default function main(app: sst.App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  const stageConfig: StageConfig | undefined = config.stages[app.stage];
  const siteDomain = stageConfig?.domain || undefined;
  const apiDomain = siteDomain ? `api.${siteDomain}` : undefined;

  if (siteDomain) {
    console.log(`Using domain: ${siteDomain}`);
  }
  else {
    console.log("Using cloudfront domain");
  }

  if (apiDomain) {
    console.log(`Using api domain: ${apiDomain}`);
  }
  else {
    console.log("Using cloudfront api domain");
  }

  const vpcStack = new VpcStack(app, "Vpc");

  app.setDefaultFunctionProps((stack) => {
    const appVpc = vpcStack.vpc;

    return {
      runtime: Runtime.NODEJS_14_X,
      vpc: appVpc,
      vpcSubnets: { subnets: appVpc.privateSubnets },
      securityGroups: [vpcStack.sgs.lambda],
    }
  });

  new WebappStack(app, "Webapp", {
    domain: siteDomain,
    certificateArn: stageConfig ? config.dnsCertificates[siteDomain!] : undefined,
  });

  new ApiStack(app, "Api", {
    domain: apiDomain,
    certificateArn: stageConfig ? config.dnsCertificates[apiDomain!] : undefined,
  });

  // Using supabase - plugin other postgres rds // new DatabaseStack(app, "Database");

  new IotStack(app, "IoT", {

  });
}
