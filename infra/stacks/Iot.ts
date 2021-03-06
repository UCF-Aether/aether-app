import * as sst from "@serverless-stack/resources";
import * as cdk from "aws-cdk-lib";
import * as logs from "aws-cdk-lib/aws-logs";
import * as iam from "aws-cdk-lib/aws-iam";
import { aws_iotwireless as iotwireless } from "aws-cdk-lib";
import { IotFunction } from "../lib/IotFunction";

export interface IotStackProps extends sst.StackProps {}

interface IotDestinations {
  uplinkRedirect: iotwireless.CfnDestination;
}

export class IotStack extends sst.Stack {
  destinations: IotDestinations;

  constructor(scope: sst.App, id: string, props: IotStackProps) {
    super(scope, id, props);

    const iotLogGroup = new logs.LogGroup(this, "IotLogGroup", {
      retention: logs.RetentionDays.FIVE_DAYS,
      logGroupName: `/${scope.name}/${scope.stage}/iot-logs`,
      removalPolicy: scope.stage === "prod" ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
    });

    const uplinkTopic = "lorawan/+/uplink";

    new IotFunction(this, {
      name: "lorawan-record-event",
      topic: uplinkTopic,
      log: iotLogGroup,
    });

    const awsLorawanUplinkFunction = new IotFunction(this, {
      name: "handle-aws-lorawan-uplink",
      publishTopicAny: true,
      log: iotLogGroup,
    });

    // This is an eye-full - allow destination to publish to topic rule
    const iotDestinationPolicy = new iam.ManagedPolicy(this, "LoRaWANDestinationIamManagedPolicy", {
      description: "Permissions to allow the LoRaWAN destination to publish to topic rules.",
      document: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: ["iot:Publish"],
            effect: iam.Effect.ALLOW,
            resources: [`arn:aws:iot:${scope.region}:${scope.account}:topic/$aws/rules/*`],
          }),
          new iam.PolicyStatement({
            actions: ["iot:DescribeEndpoint"],
            effect: iam.Effect.ALLOW,
            resources: ["*"],
          }),
        ],
      }),
    });

    const iotDestinationRole = new iam.Role(this, "LoRaWANDestinationIamRole", {
      description: "Allow LoRaWAN destinations to invoke topic rules.",
      assumedBy: new iam.ServicePrincipal("iotwireless.amazonaws.com"),
      managedPolicies: [iotDestinationPolicy],
    });

    this.destinations = {
      uplinkRedirect: new iotwireless.CfnDestination(this, "AWSUplinkRedirect", {
        name: `${scope.stage}-AWSUplinkRedirect`,
        expression: awsLorawanUplinkFunction.topicRule.topicRuleName,
        expressionType: "RuleName",
        roleArn: iotDestinationRole.roleArn,
      }),
    };
  }
}
