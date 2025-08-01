import { env } from '@/env';
import {
  HeadObjectCommand,
  type HeadObjectCommandInput
} from '@aws-sdk/client-s3';
import { getS3Client } from '../client';

/**
 * Uses `HeadObject` to check file existence without downloading the file content
 *
 * @param key - The S3 object key (path) of the file
 * @param bucket - The bucket name. Defaults to `env.S3_BUCKET_NAME`
 * @returns `true` if the file exists, `false` otherwise
 */
export const fileExists = async (
  key: string,
  bucket: string = env.S3_BUCKET_NAME
): Promise<boolean> => {
  const client = getS3Client();

  try {
    const params: HeadObjectCommandInput = {
      Bucket: bucket,
      Key: key
    };

    await client.send(new HeadObjectCommand(params));
    return true;
  } catch {
    return false;
  }
};
