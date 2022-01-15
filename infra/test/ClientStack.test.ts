import { App } from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import { ClientStack } from "../lib/stacks/ClientStack";
import { DomainType } from "../lib/InfraConfig";

describe("ClientStack", () => {
  test("Site bucket is not website", () => {
    const app = new App();
    const client = new ClientStack(app, "Client", {
      env: {
        branch: "main",
        region: "us-east-1",
        account: "12345678",
        domains: {
          type: DomainType.Route53,
          siteUrl: "aethersensor.network",
        },
        pipeline: {
          selfMutation: false,
        },
      },
    });

    const template = Template.fromStack(client);
    expect(() => {
      template.hasResource("AWS::S3::Bucket", {
        Properties: {
          BucketName: "aethersensor.network",
          WebsiteConfiguration: Match.absent(),
        },
      });
    }).not.toThrow();
  });
});
