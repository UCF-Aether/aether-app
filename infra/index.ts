import * as sst from "@serverless-stack/resources";
import { WebappStack } from "./stacks/Webapp";
import { InfraConfig, StageConfig } from "./util/InfraConfig";

import * as _config from "./infra.config.json";
const config = _config as InfraConfig;

export default function main(app: sst.App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  const stageConfig: StageConfig | undefined = config.stages[app.stage];

  new WebappStack(app, "Webapp", {
    domain: stageConfig?.domain || undefined,
    certificateArn: stageConfig ? config.dnsCertificates[stageConfig.domain] : undefined,
  });
}
