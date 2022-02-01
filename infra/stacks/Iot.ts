import * as sst from "@serverless-stack/resources";

export interface IotStackProps extends sst.StackProps {

}

export class IotStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: IotStackProps) {
    super(scope, id, props);

    new sst.Function(this, "LogEventFunction", {
      handler: "lambda/iot-store-event/main.handler",
    });
  }
}