import { env } from '@/env';
import {
  CreateBucketCommand,
  type CreateBucketCommandInput
} from '@aws-sdk/client-s3';
import { getS3Client } from '../client';

/**
 * Creates a new S3 bucket
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

  await client.send(new CreateBucketCommand(params));
};
