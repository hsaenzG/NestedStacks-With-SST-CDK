import * as apigateway from "aws-cdk-lib/aws-apigateway";
import {ServicePrincipal} from "aws-cdk-lib/aws-iam";
import {NestedStack} from "aws-cdk-lib/core";
import {ResourceNestedStackProps} from "./Stacksinterface"
import {Construct} from 'constructs';
import {Method} from "aws-cdk-lib/aws-apigateway";
import * as lambda from 'aws-cdk-lib/aws-lambda';


export class APILambda extends NestedStack {
    public readonly methods: Method[] = [];

    constructor(scope: Construct, props: ResourceNestedStackProps) {
        super(scope, 'integ-restapi-import-APILambda', props);

        const api = apigateway.RestApi.fromRestApiAttributes(this, 'RestApi', {
            restApiId: props.restApiId,
            rootResourceId: props.rootResourceId
        });


        const myLambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: "lambda.lambda_handler",
            code: lambda.Code.fromAsset('functions/lambda_integrations/'), 
        });


        const lambdaIntegration = new apigateway.LambdaIntegration(myLambdaFunction, {
            proxy: false,
            integrationResponses: [{
                statusCode: '200',
                contentHandling: apigateway.ContentHandling.PASSTHROUGH,
            }, ]
        });

        const resource = api.root.addResource('lambda1');
        const method =  resource.addMethod("GET", lambdaIntegration,{
            methodResponses: [
              {
                statusCode: '200'}]})


        myLambdaFunction.addPermission('Permitinvocation2', {
            principal: new ServicePrincipal('apigateway.amazonaws.com'),
            sourceArn: api.arnForExecuteApi('*')
        })
    
        this.methods.push(method);
    }


}

