import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface IotStackProps extends StackProps {}

export class IotStack extends Stack {
  /* eslint @typescript-eslint/no-useless-constructor: "off" */
  constructor(scope: Construct, id: string, props: IotStackProps) {
    super(scope, id, props);
  }
}
