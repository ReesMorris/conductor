import { env } from '@/env';
import { bucketExists } from './bucket-exists';
import { createBucket } from './create-bucket';

/**
 * Ensures an S3 bucket exists, creating it if necessary
 *
 * This function first checks if the bucket exists, and creates it if it doesn't.
 * Useful for initialization to ensure the bucket is ready for operations.
 *
 * @param bucketName - The name of the bucket to ensure exists. Defaults to `env.S3_BUCKET_NAME`
 */
export const ensureBucketExists = async (
  bucketName: string = env.S3_BUCKET_NAME
): Promise<void> => {
  const exists = await bucketExists(bucketName);

  if (!exists) {
    await createBucket(bucketName);
  }
};
