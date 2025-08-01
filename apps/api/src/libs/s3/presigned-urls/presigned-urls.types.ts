/**
 * Options for generating a presigned upload URL
 */
export interface GetPresignedUrlOptions {
  /**
   * The bucket to upload to. Defaults to `env.S3_BUCKET_NAME`
   */
  bucket?: string;

  /**
   * The S3 object key (path) where the file will be uploaded
   */
  key: string;

  /**
   * How long the URL should remain valid, in seconds. Defaults to 3600 (1 hour)
   */
  expiresIn?: number;

  /**
   * The MIME content type of the file being uploaded
   */
  contentType?: string;

  /**
   * The size of the file being uploaded in bytes
   */
  contentLength?: number;
}
