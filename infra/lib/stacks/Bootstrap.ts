import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

export interface GitHubBootstrapProps extends StackProps {
}

export class GitHubBoostrapStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubBootstrapProps) {
    super(scope, id, props);
  }
}
