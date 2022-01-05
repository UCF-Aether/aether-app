import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ClientStack, ClientStackProps } from "./ClientStack";
import { WorkflowStageProps } from "infra-common/lib/AetherWorkflow";
import { getDnsCertificateArn, infraSettings } from "infra-common/lib/InfraSettings";

export interface ClientDeployStageProps extends WorkflowStageProps {
}

export class ClientDeployStage extends Stage {
  constructor(scope: Construct, id: string, props: ClientDeployStageProps) {
      super(scope, id, props);

      const domain = props.config.siteUrl;
      const clientStack = new ClientStack(this, 'ClientStack', {
        domainName: domain,
        projectPath: '../',
        dnsCertificateArn: getDnsCertificateArn(domain),
        env: {
          account: props.config.account,
          region: infraSettings.region,
        }
      });
  }
}
