import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as dotenv from 'dotenv'
dotenv.config()

export class ProductAppStack extends cdk.Stack {
  readonly productsHandler: lambdaNodejs.NodejsFunction;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.productsHandler = new lambdaNodejs.NodejsFunction(this, "ProductsFunction",{
      functionName: "ProductsFunction",
      entry: "lambda/productsFunction.ts",//where the font code is
      handler: "handler",//method handler from the lambda function
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      environment: {
        IAM_AWS_REGION: process.env.IAM_AWS_REGION!,
        IAM_AWS_ACCOUNT: process.env.IAM_AWS_ACCOUNT!
      },
      timeout: cdk.Duration.seconds(8),
      bundling: {
        minify: true,
        sourceMap: false
      }
    })
  }
}
