import * as sst from "@serverless-stack/resources";
import { Construct } from "constructs";

export function toConstructName (lambda: string) {
  return lambda
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") + "Function";
};

export function newFunction(scope: Construct | sst.Stack, name: string) {
  return new sst.Function(scope, toConstructName(name), {
    handler: `lambda/${name}/main.handler`,
  });
};
