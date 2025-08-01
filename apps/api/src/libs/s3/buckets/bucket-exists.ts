import { env } from '@/env';
import {
  HeadBucketCommand,
  type HeadBucketCommandInput
} from '@aws-sdk/client-s3';
import { getS3Client } from '../client';

/**
 * Checks if an S3 bucket exists
 *
 * @param bucketName - The name of the bucket to check. Defaults to `env.S3_BUCKET_NAME`
 * @returns `true` if the bucket exists, `false` otherwise
 */
export const bucketExists = async (
  bucketName: string = env.S3_BUCKET_NAME
): Promise<boolean> => {
  const client = getS3Client();

  try {
    const params: HeadBucketCommandInput = {
      Bucket: bucketName
    };

    await client.send(new HeadBucketCommand(params));
    return true;
  } catch {
    return false;
  }
};
