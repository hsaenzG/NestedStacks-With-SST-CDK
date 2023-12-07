import { ApiGatewayV1Api } from "sst/constructs";
import { Stack } from "aws-cdk-lib/core";
import {APIStep} from "./StepFunctionStack";
import {APILambda as LambdaStack} from "./LambdaStack";
import {DeployStack} from "./DeployStacks";

export function API({ stack }: Stack ){
    
  const api = new ApiGatewayV1Api(stack, "api")

  const resourceForPath = api.cdk.restApi.root.resourceForPath('/api')
  

  const lambdaStack = new LambdaStack(this, {
    restApiId: api.restApiId,
    rootResourceId: api.cdk.restApi.root.getResource('api')?.resourceId
  });
  const stepFunctionStack = new APIStep(this, {
    restApiId: api.restApiId,
    rootResourceId:  api.cdk.restApi.root.getResource('api')?.resourceId
  });


  new DeployStack(this, {
    restApiId: api.restApiId,
    methods: lambdaStack.methods.concat(stepFunctionStack.methods),
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    apiId: api.restApiId,
    apiRootId: api.cdk.restApi.root.getResource('api')?.resourceId,
  }
}

