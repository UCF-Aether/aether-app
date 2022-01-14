import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import {
  CloudFrontDomain,
  Route53Domain,
  StaticSite,
  StaticSiteDomain,
  StaticSiteProps,
} from "../constructs/StaticSite";
import { DomainType, getDnsCertificateArn, IInfraEnvironment } from "../InfraConfig";

export interface ClientStackProps extends StackProps {
  env: IInfraEnvironment;
}

export class ClientStack extends Stack {
  readonly site: StaticSite;

  constructor(scope: Construct, id: string, props: ClientStackProps) {
    super(scope, id, props);

    const { domains } = props.env;
    let domain: StaticSiteDomain;
    switch (domains.type) {
      case DomainType.Route53: {
        const url = domains.siteUrl!;
        domain = new Route53Domain(url, getDnsCertificateArn(url));
        break;
      }
      case DomainType.CloudFront: {
        domain = new CloudFrontDomain();
        break;
      }
      default: {
        throw new Error(`No case for DomainType: ${domains.type}`);
      }
    }

    const siteProps: StaticSiteProps = {
      domain,
      buildPath: "../client/build",
    };

    this.site = new StaticSite(this, "StaticSite", siteProps);
  }
}
