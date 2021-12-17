import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticSite, StaticSiteProps } from './static-site';

export interface FrontendStackProps extends StackProps {
  domainName: string;
  stackDir: string;
}

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const siteProps: StaticSiteProps = {
      domainName: props.domainName,
      buildPath: `${props.stackDir}/build`,
    }

    const staticSite = new StaticSite(this, id, siteProps);
  }
}
