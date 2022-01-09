import { StackProps, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IInfraEnvironment, DomainType, getDnsCertificateArn } from "../InfraConfig";
import { StaticSiteDomain, Route53Domain, CloudFrontDomain, StaticSiteProps, StaticSite } from "../constructs/StaticSite";

export interface ClientStackProps extends StackProps {
  env: IInfraEnvironment;
}

export class ClientStack extends Stack {
  readonly site: StaticSite;

  constructor(scope: Construct, id: string, props: ClientStackProps) {
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
