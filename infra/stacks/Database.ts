import * as cdk from "aws-cdk-lib";
import * as sst from "@serverless-stack/resources";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as logs from "aws-cdk-lib/aws-logs";

export interface DatabaseStackProps extends sst.StackProps {

}

export class DatabaseStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: DatabaseStackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "VPC");

    const dbInst = new rds.DatabaseInstance(this, "PostgresQLInst", {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_13_4 }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO,
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      cloudwatchLogsRetention: logs.RetentionDays.ONE_WEEK,
      databaseName: "AetherDB",
      allocatedStorage: 20,
      publiclyAccessible: true,
    });

    const endpoint = dbInst.instanceEndpoint;
    new cdk.CfnOutput(this, "DBInstHostname", { value: endpoint.hostname });
    new cdk.CfnOutput(this, "DBInstPort", { value: endpoint.port.toString() });
    new cdk.CfnOutput(this, "DBInstSocketAddress", { value: endpoint.socketAddress });
  }
}
