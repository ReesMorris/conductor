import { s3Service } from '@/libs/s3';

/**
 * Transforms an S3 key to a full public URL
 * If the value is already a full URL, returns it as-is
 * If the value is null/undefined, returns null
 *
 * @param keyOrUrl - S3 key or existing URL
 * @returns Full URL to the S3 object or null
 */
export const transformS3Url = (
  keyOrUrl: string | null | undefined
): string | null => {
  if (!keyOrUrl) {
    return null;
  }

  // If it's already a full URL, return as-is
  if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
    return keyOrUrl;
  }

  // Use the S3 service to get the URL
  return s3Service.getFileUrl(keyOrUrl);
};
