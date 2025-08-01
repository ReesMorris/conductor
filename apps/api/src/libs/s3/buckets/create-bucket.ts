import { env } from '@/env';
import {
  CreateBucketCommand,
  type CreateBucketCommandInput,
  PutBucketPolicyCommand
} from '@aws-sdk/client-s3';
import { getS3Client } from '../client';

/**
 * Creates a new S3 bucket with public read access
 *
 * @param bucketName - The name of the bucket to create. Defaults to `env.S3_BUCKET_NAME`
 * @throws If the bucket already exists or if creation fails
 */
export const createBucket = async (
  bucketName: string = env.S3_BUCKET_NAME
): Promise<void> => {
  const client = getS3Client();

  const params: CreateBucketCommandInput = {
    Bucket: bucketName
  };

  // Create the bucket
  await client.send(new CreateBucketCommand(params));

  // Set bucket policy to allow public read access
  const bucketPolicy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: `arn:aws:s3:::${bucketName}/*`
      }
    ]
  };

  await client.send(
    new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy)
    })
  );
};
