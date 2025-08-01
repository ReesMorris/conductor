import { env } from '@/env';
import {
  HeadObjectCommand,
  type HeadObjectCommandInput
} from '@aws-sdk/client-s3';
import { getS3Client } from '../client';
import type { FileInfo } from './files.types';

/**
 * Retrieves file metadata including size, content type, last modified date, and ETag
 *
 * @param key - The S3 object key (path) of the file
 * @param bucket - The bucket name. Defaults to `env.S3_BUCKET_NAME`
 * @returns `FileInfo` object with file metadata if exists, or `{exists: false}` if not found
 */
export const getFileInfo = async (
  key: string,
  bucket: string = env.S3_BUCKET_NAME
): Promise<FileInfo> => {
  const client = getS3Client();

  try {
    const params: HeadObjectCommandInput = {
      Bucket: bucket,
      Key: key
    };

    const response = await client.send(new HeadObjectCommand(params));

    return {
      exists: true,
      size: response.ContentLength,
      contentType: response.ContentType,
      lastModified: response.LastModified,
      etag: response.ETag
    };
  } catch {
    return { exists: false };
  }
};
