import { env } from '@/env';

/**
 * Generates a public URL for accessing a file in S3
 *
 * @param key - The S3 object key (path) of the file
 * @param bucket - The bucket name. Defaults to `env.S3_BUCKET_NAME`
 * @returns The public URL for the file
 * @description Generates the appropriate URL format based on whether path-style
 * or virtual-hosted-style URLs are configured. Path-style is typically used
 * for S3-compatible services like MinIO, while virtual-hosted-style is standard for AWS S3.
 *
 * @example
 * // Path-style (MinIO): http://localhost:9000/bucket/users/123/profile/photo.jpg
 * // Virtual-hosted: https://bucket.s3.amazonaws.com/users/123/profile/photo.jpg
 */
export const getFileUrl = (
  key: string,
  bucket: string = env.S3_BUCKET_NAME
): string => {
  const url = new URL(env.S3_ENDPOINT);

  if (env.S3_FORCE_PATH_STYLE) {
    // Path-style URL (MinIO): http://endpoint/bucket/key
    return `${env.S3_ENDPOINT}/${bucket}/${key}`;
  } else {
    // Virtual-hosted-style URL (S3): http://bucket.endpoint/key
    return `${url.protocol}//${bucket}.${url.host}/${key}`;
  }
};
