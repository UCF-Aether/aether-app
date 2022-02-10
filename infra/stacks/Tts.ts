import * as cfninc from "aws-cdk-lib/cloudformation-include";
import * as sst from "@serverless-stack/resources";

export enum ThingNameScheme {
  DEV_EUI = "DevEUI",
  DEVICE_ID = "DeviceID",
}

export enum Cluster {
  NAM1 = "nam1.cloud.thethings.network",
  EU1 = "eu1.cloud.thethings.network",
  AU1 = "eu1.cloud.thethings.network",
}

export interface TtsCommunityIntegrationStackProps extends sst.StackProps {
  // The Things Stack Community cluster address.
  clusterAddress: Cluster;

  // ID of the application in The Things Stack.
  applicationId: string;

  // API key of the application in The Things Stack. This API key has to have at least the rights to
  // edit basic settings, get and set end devices with keys and read and write traffic.
  applicationApiKey: string;

  // IoT Core thing type name. This needs to be unique in your AWS account.
  //
  // @default 'lorawan'
  thingTypeName?: string;

  // The name that is given to AWS IoT things when they are created by the integration. When using
  // DevEUI, the thing name will be like 1122334455667788. When using Device ID, the thing name will
  // be a combination of the CloudFormation stack name and the device ID as registered in The Things
  // Stack.
  //
  // @default DEV_EUI
  thingNameScheme?: ThingNameScheme;

  // Update metrics in the thing shadow (activated and last seen timestamps, session information,
  // coverage, RSSI and SNR). Disable this to reduce Device Shadow charges.
  //
  // @default true
  thingShadowMetrics?: boolean;

  // Trigger a CloudWatch alarm when a new version of this integration is available
  //
  // @default true
  versionCheck?: boolean;
}

const enabled = (b: boolean | null | undefined) => (b ? "Enabled" : "Disabled");

// AWS IoT Integration 1.1.8 for The Things Stack
export class TtsCommunityIntegrationStack extends sst.Stack {
  ttnTemplate: cfninc.CfnInclude;

  constructor(scope: sst.App, id: string, props: TtsCommunityIntegrationStackProps) {
    super(scope, id, props);

    this.ttnTemplate = new cfninc.CfnInclude(this, "TtsCloudIntegrationTemplate", {
      templateFile: "infra/stacks/templates/tts-community.template.json",
      parameters: {
        ThingTypeName: props.thingTypeName ?? "lorawan",
        'ThingNameScheme': props.thingNameScheme ?? ThingNameScheme.DEV_EUI,
        ThingShadowMetrics: enabled(props.thingShadowMetrics ?? true),
        ClusterAddress: props.clusterAddress,
        ApplicationID: props.applicationId,
        ApplicationAPIKey: props.applicationApiKey,
        CheckVersion: enabled(props.versionCheck ?? true),
      },
    });
  }
}
