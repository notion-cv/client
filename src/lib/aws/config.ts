import { LambdaClient } from '@aws-sdk/client-lambda';

const commonConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

export const lambdaClient = new LambdaClient(commonConfig);
