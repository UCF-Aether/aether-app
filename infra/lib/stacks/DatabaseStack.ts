import { StackProps, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface DatabaseStackProps extends StackProps {

}

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);
  }
}
