
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { NestedStack } from "aws-cdk-lib/core";
import { ResourceNestedStackProps } from "./Stacksinterface"
import { Construct } from 'constructs';
import { Method } from "aws-cdk-lib/aws-apigateway";



export class APIStep extends  NestedStack {
    public readonly methods: Method[] = [];
  
   constructor(scope: Construct, props: ResourceNestedStackProps) {
      super(scope, 'integ-restapi-import-APIStep', props);
  
      const api = apigateway.RestApi.fromRestApiAttributes(this, 'RestApi', {
        restApiId: props.restApiId,
        rootResourceId: props.rootResourceId,
      });
  
      const method = api.root.addResource('step').addMethod('GET', new apigateway.MockIntegration({
        integrationResponses: [{
          statusCode: '200',
        }],
        passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
        requestTemplates: {
          'application/json': '{ "statusCode": 200 }',
        },
      }), {
        methodResponses: [{ statusCode: '200' }],
      });
  
      this.methods.push(method);
    }
}