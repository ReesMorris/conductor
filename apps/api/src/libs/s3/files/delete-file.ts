import { env } from '@/env';
import {
  DeleteObjectCommand,
  type DeleteObjectCommandInput
} from '@aws-sdk/client-s3';
import { getS3Client } from '../client';

/**
 * Permanently removes a file from S3. Note that S3 returns success
 * even if the file doesn't exist, following idempotent deletion semantics.
 *
 * @param key - The S3 object key (path) of the file to delete
 * @param bucket - The bucket name. Defaults to `env.S3_BUCKET_NAME`
 */
export const deleteFile = async (
  key: string,
  bucket: string = env.S3_BUCKET_NAME
): Promise<void> => {
  const client = getS3Client();

  const params: DeleteObjectCommandInput = {
    Bucket: bucket,
    Key: key
  };

  await client.send(new DeleteObjectCommand(params));
};
