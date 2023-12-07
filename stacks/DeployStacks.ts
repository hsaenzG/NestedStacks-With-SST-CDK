
import { NestedStack } from "aws-cdk-lib/core";
import { DeployStackProps } from "./Stacksinterface";
import { Construct } from 'constructs';
import {RestApi,Stage,Deployment} from "aws-cdk-lib/aws-apigateway";

export class DeployStack extends NestedStack {
  constructor(scope: Construct, props: DeployStackProps) {
    super(scope, 'integ-restapi-import-DeployStack', props);

    const deployment = new Deployment(this, 'Deployment', {
      api: RestApi.fromRestApiId(this, 'RestApi', props.restApiId),
    });
    if (props.methods) {
      for (const method of props.methods) {
        deployment.node.addDependency(method);
      }
    }
    new Stage(this, 'Stage', { deployment });
  }
}