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
  service: ecsPatterns.ApplicationLoadBalancedEc2Service;

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

    this.service = new ecsPatterns.ApplicationLoadBalancedEc2Service(this, "ApiService", {
      cluster: this.cluster,
      certificate,
      memoryLimitMiB: 1024,
      // Valid values, which determines your range of valid values for the memory parameter:
      //  256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
      //  512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
      //  1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
      //  2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
      //  4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
      cpu: 256,
      desiredCount: 1,
      domainName: props.domain,
      domainZone,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset("api/"),
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
        }
      }
    })
  }
}
