import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface ApiStackProps extends StackProps {}

export class ApiStack extends Stack {
  /* eslint @typescript-eslint/no-useless-constructor: "off" */
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
  }
}
