#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { ProductAppStack } from '../lib/productApp-stack';

const env: cdk.Environment = {
  region: process.env.IAM_AWS_REGION,
  account: process.env.IAM_AWS_ACCOUNT
}

const tags = {
  cost: "ShoppingList",
  team: "Dave's Team"
}

const app = new cdk.App();

const productAppStack = new ProductAppStack(app, 'ProductsApp', {
  env: env,
  tags: tags
})