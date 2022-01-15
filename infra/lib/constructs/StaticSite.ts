import { CfnOutput, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { BehaviorOptions, Distribution, ErrorResponse, IOrigin } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

// export interface StaticSiteDomain {
//   domain: string;
//   dnsCertificateArn: string;
//   subDomain?: string;
// }

export interface SiteDomainDistributionProps {
  origin: IOrigin;
  errorResponses?: Array<ErrorResponse>;
}

export abstract class StaticSiteDomain {
  protected domain: string;

  protected distribution: Distribution;

  protected readonly defaultBehavior: Partial<BehaviorOptions> = {
    allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    originRequestPolicy: cloudfront.OriginRequestPolicy.USER_AGENT_REFERER_HEADERS,
  };

  protected readonly defaultRootObject = "index.html";

  abstract getDistribution(scope: Construct, props: SiteDomainDistributionProps): Distribution;

  abstract siteUrl(): string;
}

export class CloudFrontDomain extends StaticSiteDomain {
  siteUrl(): string {
    if (!this.distribution) {
      throw new Error("The distribution has not been created yet (no generated URL)");
    }

    return this.distribution.distributionDomainName;
  }

  getDistribution(scope: Construct, props: SiteDomainDistributionProps): Distribution {
    if (this.distribution) {
      return this.distribution;
    }

    this.distribution = new cloudfront.Distribution(scope, "SiteDistribution", {
      defaultRootObject: this.defaultRootObject,
      defaultBehavior: {
        origin: props.origin,
        ...this.defaultBehavior,
      },
      errorResponses: props.errorResponses || [],
    });

    return this.distribution;
  }
}

export class Route53Domain extends StaticSiteDomain {
  readonly dnsCertificateArn: string;

  constructor(domain: string, dnsCertificateArn: string) {
    super();
    this.domain = domain;
    this.dnsCertificateArn = dnsCertificateArn;
  }

  siteUrl(): string {
    return this.domain;
  }

  getDistribution(scope: Construct, props: SiteDomainDistributionProps): Distribution {
    if (this.distribution) {
      return this.distribution;
    }

    const domain = this.siteUrl();
    const zone = route53.HostedZone.fromLookup(scope, "Zone", {
      domainName: domain,
    });
    // s3-website-us-east-1.amazonaws.c
    // TLS certificate
    const dnsCertificate = Certificate.fromCertificateArn(
      scope,
      "Certificate",
      this.dnsCertificateArn
    );
    new CfnOutput(scope, "CertificateARN", {
      value: dnsCertificate.certificateArn,
    });

    this.distribution = new cloudfront.Distribution(scope, "SiteDistribution", {
      defaultRootObject: this.defaultRootObject,
      defaultBehavior: {
        origin: props.origin,
        ...this.defaultBehavior,
      },
      domainNames: [domain],
      certificate: dnsCertificate,
      errorResponses: props.errorResponses || [],
    });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(scope, "SiteAliasRecord", {
      recordName: domain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution)),
      zone,
    });

    return this.distribution;
  }
}

export interface StaticSiteProps {
  domain: StaticSiteDomain;
  buildPath: string;
  errorResponses?: Array<ErrorResponse>;
}

export class StaticSite extends Construct {
  readonly domain: StaticSiteDomain;

  readonly siteBucket: s3.Bucket;

  constructor(scope: Stack, id: string, props: StaticSiteProps) {
    super(scope, id);
    this.domain = props.domain;

    const siteBucketName =
      props.domain instanceof Route53Domain
        ? props.domain.siteUrl()
        : `${id.toLowerCase()}-cloudfront-net`;
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "cloudfront-OAI", {
      comment: `OAI for ${id}`,
    });

    // Content bucket
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: siteBucketName,
      // Use cloudfront redirects...if s3 is configured as a website, it expects
      // the
      // *.s3-website-<region>.amazonaws.com URL to be available. But, that URL
      // is only available if the bucket is publically readable. 2-3 fucking
      // hours wasted on this bullshit!
      // websiteIndexDocument: 'index.html',
      // websiteErrorDocument: 'error.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      /**
       * The default removal policy is RETAIN, which means that cdk destroy will
       * not attempt to delete the new bucket, and it will remain in your
       * account until manually deleted. By setting the policy to DESTROY, cdk
       * destroy will attempt to delete the bucket, but will error if the bucket
       * is not empty.
       */
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code

      /**
       * For sample purposes only, if you create an S3 bucket then populate it,
       * stack destruction fails.  This setting will enable full cleanup of the
       * demo.
       */
      autoDeleteObjects: true, // NOT recommended for production code
    });

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );
    new CfnOutput(this, "Bucket", {
      value: siteBucket.bucketName,
    });
    new CfnOutput(this, "BucketURL", {
      value: siteBucket.bucketWebsiteUrl,
    });

    const s3origin = new S3Origin(siteBucket, {
      originAccessIdentity: cloudfrontOAI,
    });
    const distribution = this.domain.getDistribution(this, {
      origin: s3origin,
      errorResponses: props.errorResponses,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, "StaticSiteBucket", {
      sources: [s3deploy.Source.asset(props.buildPath)],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
