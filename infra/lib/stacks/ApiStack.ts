import { StackProps, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface ApiStackProps extends StackProps {

}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
  }
}
