import * as cdk from "aws-cdk-lib";
import * as sst from "@serverless-stack/resources";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as cm from "aws-cdk-lib/aws-certificatemanager";

export interface ApiStackProps extends sst.StackProps {
  vpc: ec2.Vpc;
  domain?: string;
  hostedZone?: route53.IHostedZone,
  certificateArn?: string;
}

export class ApiStack extends sst.Stack {
  cluster: ecs.Cluster;
  service: ecsPatterns.ApplicationLoadBalancedFargateService;

  constructor(scope: sst.App, id: string, props: ApiStackProps) {
    super (scope, id, props);

    const certificate = props.certificateArn 
      ? cm.Certificate.fromCertificateArn(this, "ApiDNSCertificate", props.certificateArn)
      : undefined;

    let domainZone = undefined;

    if (props.hostedZone)
      domainZone = props.hostedZone;
    else if (props.domain) {
      domainZone = route53.HostedZone.fromLookup(this, "ApiHostedZone", {
        domainName: props.domain,
      });
    }

    this.cluster = new ecs.Cluster(this, "ApiServiceCluster", {
      vpc: props.vpc,
    });

    this.cluster.addCapacity("DefaultAutoScalingGroupCapacity", {
      instanceType: new ec2.InstanceType("t2.micro"),
      desiredCapacity: 1,
    });

    console.log(`cert: ${certificate}`);
    console.log(`domain: ${props.domain}`);
    console.log(`hz: ${domainZone}`);

    this.service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "PostgraphileApiService", {
      cluster: this.cluster,
      memoryLimitMiB: 1024,
      desiredCount: 1,
      cpu: 512,
      circuitBreaker: { rollback: true },
      serviceName: "PostgraphileApi",
      domainName: props.domain,
      domainZone,
      certificate,
      redirectHTTP: certificate != null || certificate != undefined,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset("api/"),
        containerPort:80,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          APP_STAGE: scope.stage.toUpperCase(),
        },
      },
      publicLoadBalancer: true,
      assignPublicIp: true,
    });
  }
}
