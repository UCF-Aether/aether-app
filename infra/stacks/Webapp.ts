import { StaticSite, StaticSiteProps } from "@serverless-stack/resources";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import * as sst from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

export interface WebappStackProps extends sst.StackProps {
  domain?: string;
  certificateArn?: string;
}

export class WebappStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: WebappStackProps) {
    super (scope, id, props);
    const path = "client";

    let siteProps: StaticSiteProps = {
      path,
      buildOutput: "build",
      buildCommand: `pnpm build --filter ./${path}`,
      s3Bucket: {
        removalPolicy: scope.stage === "prod" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
        autoDeleteObjects: scope.stage !== "prod",
      },
    };

    if (props.domain) {
      siteProps = {
        ...siteProps,
        customDomain: {
          domainName: props.domain,
          domainAlias: `www.${props.domain}`,
          certificate: Certificate.fromCertificateArn(this, "SiteCertificate", props.certificateArn!),
        }
      }
    }
    new StaticSite(this, "Site", siteProps);
  }
}
