import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendStack } from "./frontend-stack";
import { FrontendProps } from "../frontend-pipeline";

export class FrontendProdStage extends Stage {
  constructor(scope: Construct, id: string, props: FrontendProps) {
      super(scope, id, {
        env: props.env,
      });

      const frontendStack = new FrontendStack(this, id, props);
  }
}
