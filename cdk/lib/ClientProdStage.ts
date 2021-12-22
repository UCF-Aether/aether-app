import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ClientStack } from "./ClientStack";
import { ClientProps } from "./ClientPipeline";

export class ClientProdStage extends Stage {
  constructor(scope: Construct, id: string, props: ClientProps) {
      super(scope, id, {
        env: props.env,
      });

      const frontendStack = new ClientStack(this, id, props);
  }
}
