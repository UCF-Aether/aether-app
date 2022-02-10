import { toConstructName } from "../util/Function";
import * as sst from "@serverless-stack/resources";
import * as iot from "@aws-cdk/aws-iot-alpha";
import * as actions from "@aws-cdk/aws-iot-actions-alpha";
import * as logs from "aws-cdk-lib/aws-logs";
import * as iam from "aws-cdk-lib/aws-iam";

export interface IotFunctionProps extends sst.FunctionProps {
  name: string;
  topic?: string;
  publishTopic?: string;
  publishTopicAny?: boolean;
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
      handler: `lambda/${props.name}/index.handler`,
      ...(props as sst.FunctionProps),
      environment: {
        ...(props.publishTopic ? { PUBLISH_TOPIC: props.publishTopic } : {}),
        ...props.environment,
      },
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

    if (props.publishTopicAny) {
      this.attachPermissions(["iot:Publish"]);
    } else if (props.publishTopic) {
      const topicType = props.publishTopic.search(/\+|#/) ? 'topicfilter' : 'topic';
      this.attachPermissions([
        // TODO: this might not work - use publishTopicAny for now.
        new iam.PolicyStatement({
          actions: ["iot:Publish"],
          effect: iam.Effect.ALLOW,
          resources: [`arn:aws:iot:${scope.region}:*:${topicType}/${props.publishTopic}`],
        }),
      ]);
    }
  }
}
