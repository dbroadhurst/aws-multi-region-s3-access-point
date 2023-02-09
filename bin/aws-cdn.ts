#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "aws-cdk-lib"
import { BucketStack } from "../lib/bucketStack"
import { MultiRegionAccessStack } from "../lib/multiRegionAccessStack"

const app = new cdk.App()

const filename = "cdn-test-bucket"
const account = process.env.AWS_DEFAULT_ACCOUNT

const usEast1 = new BucketStack(app, `${filename}-us-east-1`, {
  env: { account, region: "us-east-1" },
})
const usWest2 = new BucketStack(app, `${filename}-us-west-2`, {
  env: { account, region: "us-west-2" },
})
const euWest1 = new BucketStack(app, `${filename}-eu-west-1`, {
  env: { account, region: "eu-west-1" },
})

new MultiRegionAccessStack(app, "cdn-multi-region-stack", {
  env: { account, region: "us-east-1" },
  buckets: [
    { bucket: usEast1.bucket.bucketName },
    { bucket: usWest2.bucket.bucketName },
    { bucket: euWest1.bucket.bucketName },
  ],
})
