import * as sst from "@serverless-stack/resources";

export interface IotStackProps extends sst.StackProps {

}

export class IotStack extends sst.Stack {
    constructor(scope: sst.App, id: string, props: IotStackProps) {
        super(scope, id, props);
    }
}