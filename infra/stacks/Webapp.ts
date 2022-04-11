import { StaticSite, StaticSiteProps } from "@serverless-stack/resources";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as sst from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";
import { CfnOutput } from "aws-cdk-lib";

export interface WebappStackProps extends sst.StackProps {
  graphqlUrl?: string;
  domain?: string;
  certificateArn?: string;
}

export class WebappStack extends sst.Stack {
  site: StaticSite;

  constructor(scope: sst.App, id: string, props: WebappStackProps) {
    super (scope, id, props);
    const path = "client";

    let siteProps: StaticSiteProps = {
      path,
      // To support single page applications
      errorPage: sst.StaticSiteErrorOptions.REDIRECT_TO_INDEX_PAGE,
      buildOutput: "build",
      buildCommand: `pnpm build --filter ${path}`,
      cfDistribution: {
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      },
      environment: {
        // REACT_APP_GRAPHQL_URL: props.graphqlUrl,
        REACT_APP_SUPABASE_PUBLIC_ANON_KEY: process.env.SUPABASE_PUBLIC_ANON_KEY!,
        REACT_APP_MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN!,
        REACT_APP_SUPABASE_URL: process.env.SUPABASE_URL!,
      },
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
          // domainAlias: `www.${props.domain}`,
          certificate: Certificate.fromCertificateArn(this, "SiteCertificate", props.certificateArn!),
        }
      }
    }
    else {
      // Don't have a certificate for ELB (elastic load balancer) used for in the API stack. Allow
      // both HTTP and HTTPS for non-prod environments (prod has domain) or else there will be
      // mixed-content errors due to the cloudfront distribution being (defaults to) redirect-to-HTTPS.
      siteProps = {
        ...siteProps,
        cfDistribution: {
          ...(siteProps.cfDistribution || {}),
          defaultBehavior: {
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.ALLOW_ALL,
          }
        }
      }
    }

    this.site = new StaticSite(this, "Site", siteProps);

    new CfnOutput(this, "WebappURL", { value: this.site.url });
  }
}
