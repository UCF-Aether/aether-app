import * as sst from "@serverless-stack/resources";
import { ApolloApi } from "@serverless-stack/resources";
import { WebappStackProps } from "./Webapp";

export class ApiStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: WebappStackProps) {
    super (scope, id, props);

    new ApolloApi(this, "ApolloGraphQLAPI", {
      server: "../api"
    });
  }
}
