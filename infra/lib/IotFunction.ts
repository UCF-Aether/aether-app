import { toConstructName } from "../util/Function";
import * as sst from "@serverless-stack/resources";
import * as iot from "@aws-cdk/aws-iot-alpha";
import * as actions from "@aws-cdk/aws-iot-actions-alpha";
import * as logs from "aws-cdk-lib/aws-logs";

export interface IotFunctionProps extends sst.FunctionProps {
  name: string;
  topic?: string;
  sql?: string;
  log?: logs.LogGroup;
  otherActions?: [iot.IAction];
}

export class IotFunction extends sst.Function {
  topicRule: iot.TopicRule;

  constructor(scope: sst.Stack, props: IotFunctionProps | string) {
    if (typeof props === "string") props = { name: props };

    const constructName = toConstructName(props.name);
    super(scope, constructName, {
      functionName: `${scope.stage}-${props.name}`,
      handler: `lambda/${props.name}/main.handler`,
      ...(props as sst.FunctionProps),
    });

    const topic = props.topic ?? "iot/topic";
    const sql = iot.IotSql.fromStringAsVer20160323(props.sql ?? `SELECT * FROM '${topic}'`);
    const otherActions: Array<iot.IAction> = props.otherActions ?? [];

    if (props.log) otherActions.push(new actions.CloudWatchLogsAction(props.log));

    this.topicRule = new iot.TopicRule(this, `${constructName}Rule`, {
      topicRuleName: `${scope.stage}_${constructName}Rule`,
      sql,
      actions: [new actions.LambdaFunctionAction(this), ...otherActions],
    });
  }
}
