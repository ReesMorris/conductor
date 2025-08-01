import { env } from '@/env';
import { S3Client, type S3ClientConfig } from '@aws-sdk/client-s3';

let s3Client: S3Client | null = null;

/**
 * Generates the S3 client configuration from environment variables
 *
 * @returns `S3ClientConfig` object with endpoint, credentials, and other settings
 * @description Configures the S3 client to work with both AWS S3 and S3-compatible
 * storage providers like MinIO. Supports both path-style and virtual-hosted-style URLs.
 */
export const getS3ClientConfig = (): S3ClientConfig => {
  // For MinIO and other S3-compatible services, we can pass the endpoint directly
  return {
    endpoint: env.S3_ENDPOINT,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY
    },
    region: env.S3_REGION,
    forcePathStyle: env.S3_FORCE_PATH_STYLE
  };
};

/**
 * Gets or creates a singleton S3 client instance
 *
 * @returns `S3Client` instance configured with environment settings
 * @description Uses a singleton pattern to ensure only one S3 client is created
 * and reused throughout the application lifecycle.
 */
export const getS3Client = (): S3Client => {
  if (!s3Client) {
    s3Client = new S3Client(getS3ClientConfig());
  }
  return s3Client;
};
