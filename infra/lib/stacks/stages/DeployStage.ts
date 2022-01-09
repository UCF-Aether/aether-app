import { Stack, StackProps, Environment, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IInfraEnvironment } from "../../InfraConfig";
import { ClientStack } from "../ClientStack";
import { IotStack } from "../IotStack";
import { DatabaseStack } from "../DatabaseStack";
import { ApiStack } from "../ApiStack";

export interface DeployStageProps extends StageProps {
  env: IInfraEnvironment;
}

export class DeployStage extends Stage {
  readonly client: ClientStack;

  readonly iot: IotStack;

  readonly db: DatabaseStack;

  readonly api: ApiStack;

  constructor(scope: Construct, id: string, props: DeployStageProps) {
    super(scope, id, props);

    this.client = new ClientStack(this, 'ClientStack', { env: props.env });

    // this.api = new ApiStack(this, 'APIStack', {});
    //
    // this.iot = new IotStack(this, 'IoTStack', {});
    //
    // this.db = new DatabaseStack(this, 'DBStack', {});
  }
}
