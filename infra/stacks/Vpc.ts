import * as sst from "@serverless-stack/resources";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface VpcStackProps extends sst.StackProps {

}

export class VpcStack extends sst.Stack {
  vpc: ec2.Vpc;
  sgs: {
    lambda: ec2.SecurityGroup;
    api: ec2.SecurityGroup;
  }

  constructor(scope: sst.App, id: string, props?: VpcStackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, "AetherVPC",);

    this.sgs = {
      lambda: new ec2.SecurityGroup(this, "LambdaSG", {
        vpc: this.vpc,
        description: "Security group for outbound lambda traffic",
      }),
      api: new ec2.SecurityGroup(this, "ApiEc2SG", {
        vpc: this.vpc,
        description: "Security group for the API EC2 instance",
      }),
    };
  }
}
