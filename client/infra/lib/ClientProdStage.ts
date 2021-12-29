import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ClientStack } from "./ClientStack";
import { MonoRepoPipelineProps } from "./ClientPipeline";

export class ClientProdStage extends Stage {
  constructor(scope: Construct, id: string, props: MonoRepoPipelineProps) {
      super(scope, id, {
        env: props.env,
      });

      const frontendStack = new ClientStack(this, id, props);
  }
}
