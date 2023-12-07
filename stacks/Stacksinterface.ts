import { NestedStackProps } from "aws-cdk-lib/core";

export interface ResourceNestedStackProps extends NestedStackProps {
    readonly restApiId: string;
    readonly rootResourceId: string;
   //readonly authorizer: apigateway.TokenAuthorizer
  }

  export interface DeployStackProps extends NestedStackProps {
    readonly restApiId: string;
    readonly methods?: Method[];
  }
  