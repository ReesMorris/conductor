/**
 * Information about a file stored in S3
 */
export interface FileInfo {
  /**
   * Whether the file exists
   */
  exists: boolean;

  /**
   * File size in bytes
   */
  size?: number;

  /**
   * MIME type of the file
   */
  contentType?: string;

  /**
   * Date when the file was last modified
   */
  lastModified?: Date;

  /**
   * Entity tag (ETag) of the file, useful for caching
   */
  etag?: string;
}
