import { Stack, StackProps, ContextProvider } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticSite, StaticSiteProps } from './StaticSite'
import { MonoRepoPipelineProps } from './ClientPipeline';

export class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props: MonoRepoPipelineProps) {
    super(scope, id, props);

    const siteProps: StaticSiteProps = {
      domainName: props.domainName,
      buildPath: `${props.stackDir}/build`,
      dnsCertificateArn: props.clientCertificateArn,
    };

    const staticSite = new StaticSite(this, id, siteProps);
  }
}
