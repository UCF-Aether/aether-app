import { Stack, StackProps, ContextProvider } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticSite, StaticSiteProps } from './StaticSite'

export interface ClientStackProps extends StackProps {
  domainName: string;
  projectPath: string;
  dnsCertificateArn: string;
}

export class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props: ClientStackProps) {
    super(scope, id, props);

    const siteProps: StaticSiteProps = {
      domainName: props.domainName,
      buildPath: `${props.projectPath}/build`,
      dnsCertificateArn: props.dnsCertificateArn,
    };

    const staticSite = new StaticSite(this, 'StaticSite', siteProps);
  }
}
