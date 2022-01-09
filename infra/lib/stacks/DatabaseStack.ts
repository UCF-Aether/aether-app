import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface DatabaseStackProps extends StackProps {}

export class DatabaseStack extends Stack {
  /* eslint @typescript-eslint/no-useless-constructor: "off" */
  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);
  }
}
