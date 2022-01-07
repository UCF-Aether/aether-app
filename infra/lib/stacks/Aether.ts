import { Stack, StackProps, Environment } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ClientStack } from "./ClientStack";
import { DomainType, IInfraEnvironment, getDnsCertificateArn } from "../InfraConfig";
import { Route53Domain, CloudFrontDomain, StaticSiteDomain, StaticSiteProps, StaticSite } from "../constructs/StaticSite";

export interface AetherStackProps extends StackProps {
  env: IInfraEnvironment;
}

export class AetherStack extends Stack {
  readonly site: StaticSite;

  constructor(scope: Construct, id: string, props: AetherStackProps) {
    super(scope, id, props);

    const domains = props.env.domains;

    let domain: StaticSiteDomain;
    switch(domains.type) {
      case DomainType.Route53:
        const url = domains.siteUrl as string;
        domain = new Route53Domain(url, getDnsCertificateArn(url));
        break;
      case DomainType.CloudFront:
        domain = new CloudFrontDomain();
        break;
    }

    const siteProps: StaticSiteProps = {
      domain,
      buildPath: '../client/build',
    };

    this.site = new StaticSite(this, 'StaticSite', siteProps);
  }
}
