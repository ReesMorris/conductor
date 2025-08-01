import { env } from '@/env';
import {
  PutObjectCommand,
  type PutObjectCommandInput
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client } from '../client';
import type { GetPresignedUrlOptions } from './presigned-urls.types';

/**
 * Creates a secure, temporary URL that allows direct file uploads to S3
 * without exposing AWS credentials. The URL can be used for PUT requests
 * to upload files directly to the specified S3 bucket and key.
 *
 * @param options - Configuration options for the presigned URL
 * @returns A presigned URL that can be used for PUT requests to upload files
 *
 * @example
 * const uploadUrl = await getPresignedUploadUrl({
 *   key: 'users/123/profile/photo.jpg',
 *   contentType: 'image/jpeg',
 *   contentLength: 1024000,
 *   expiresIn: 300 // 5 minutes
 * });
 */
export const getPresignedUploadUrl = async (
  options: GetPresignedUrlOptions
): Promise<string> => {
  const {
    bucket = env.S3_BUCKET_NAME,
    key,
    expiresIn = 3600, // 1 hour default
    contentType,
    contentLength
  } = options;

  const client = getS3Client();

  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: key,
    ACL: 'public-read'
  };

  if (contentType) {
    params.ContentType = contentType;
  }

  if (contentLength) {
    params.ContentLength = contentLength;
  }

  const command = new PutObjectCommand(params);

  return await getSignedUrl(client, command, { expiresIn });
};
