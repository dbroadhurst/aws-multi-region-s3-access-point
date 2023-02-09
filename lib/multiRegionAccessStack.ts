import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as s3 from "aws-cdk-lib/aws-s3"

interface AwsCdnStackProps extends cdk.StackProps {
  buckets: any
}

export class MultiRegionAccessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsCdnStackProps) {
    super(scope, id, props)

    const buckets = props.buckets

    const cfnMultiRegionAccessPoint = new s3.CfnMultiRegionAccessPoint(this, "cdn-multi-region-stack", {
      regions: buckets,
    })
  }
}
