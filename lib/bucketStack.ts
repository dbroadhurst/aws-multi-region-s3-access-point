import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as iam from "aws-cdk-lib/aws-iam"

interface BucketStackProps extends cdk.StackProps {}

export class BucketStack extends cdk.Stack {
  public bucket: cdk.aws_s3.Bucket

  constructor(scope: Construct, id: string, props: BucketStackProps) {
    super(scope, id, props)

    const region = props?.env?.region

    this.bucket = new s3.Bucket(this, `cdn-test-bucket-${region}`, {
      bucketName: `cdn-test-bucket-${region}`,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: true,
    })

    this.bucket.grantRead(new iam.AccountRootPrincipal())
  }
}
