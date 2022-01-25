import * as sst from "@serverless-stack/resources";
import { ApolloApi, ApolloApiProps } from "@serverless-stack/resources";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { CfnOutput } from "aws-cdk-lib";

export interface ApiStackProps extends sst.StackProps {
  domain?: string;
  certificateArn?: string;
}

export class ApiStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: ApiStackProps) {
    super (scope, id, props);

    let apolloProps: ApolloApiProps = {
      rootPath: "/graphql",
      server: {
        handler: "api/graphql.handler",
        runtime: "nodejs14.x",
      },
    };

    if (props.domain) {
      apolloProps = {
        ...apolloProps,
        customDomain: {
          domainName: props.domain,
          certificate: Certificate.fromCertificateArn(this, "APICertificate", props.certificateArn!)
        }
      }
    }

    const apolloApi = new ApolloApi(this, "ApolloGraphQLAPI", apolloProps);
    new CfnOutput(this, "ApolloApiURL", { value: `${apolloApi.url}/graphql` });
  }
}
