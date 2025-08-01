import { ensureBucketExists } from './buckets';
import {
  deleteFile,
  type FileInfo,
  fileExists,
  getFileInfo,
  getFileUrl
} from './files';
import {
  type GetPresignedUrlOptions,
  getPresignedUploadUrl
} from './presigned-urls';
import { type GenerateKeyOptions, generateKey } from './utils';

/**
 * High-level S3 service that provides a unified interface for S3 operations
 *
 * @description This service automatically ensures the bucket exists before performing
 * operations and provides convenience methods for common S3 tasks. It uses a singleton
 * pattern and lazy initialization to optimize performance.
 */
export class S3Service {
  private initialized = false;

  /**
   * Initializes the S3 service by ensuring the bucket exists
   *
   * @description Called automatically before operations that require the bucket.
   * Uses a flag to ensure initialization only happens once.
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await ensureBucketExists();
    this.initialized = true;
  }

  /**
   * Generates a presigned URL for file upload
   *
   * @param options - Configuration options for the presigned URL
   * @returns A presigned URL for uploading files
   * @description Ensures bucket exists before generating the URL
   */
  async getPresignedUploadUrl(
    options: GetPresignedUrlOptions
  ): Promise<string> {
    await this.initialize();
    return getPresignedUploadUrl(options);
  }

  /**
   * Checks if a file exists in S3
   *
   * @param key - The S3 object key
   * @param bucket - Optional bucket name
   * @returns `true` if file exists, `false` otherwise
   */
  async fileExists(key: string, bucket?: string): Promise<boolean> {
    await this.initialize();
    return fileExists(key, bucket);
  }

  /**
   * Gets detailed information about a file
   *
   * @param key - The S3 object key
   * @param bucket - Optional bucket name
   * @returns FileInfo object with metadata
   */
  async getFileInfo(key: string, bucket?: string): Promise<FileInfo> {
    await this.initialize();
    return getFileInfo(key, bucket);
  }

  /**
   * Deletes a file from S3
   *
   * @param key - The S3 object key to delete
   * @param bucket - Optional bucket name
   */
  async deleteFile(key: string, bucket?: string): Promise<void> {
    await this.initialize();
    return deleteFile(key, bucket);
  }

  /**
   * Generates a public URL for a file
   *
   * @param key - The S3 object key
   * @param bucket - Optional bucket name
   * @returns The public URL for the file
   */
  getFileUrl(key: string, bucket?: string): string {
    return getFileUrl(key, bucket);
  }

  /**
   * Generates a secure, unique S3 key for files
   *
   * @param options - Configuration options for key generation
   * @returns A unique S3 key
   * @description Uses UUID by default for security. See GenerateKeyOptions for customization.
   */
  generateKey(options: GenerateKeyOptions): string {
    return generateKey(options);
  }
}

/**
 * Singleton instance of the S3 service
 * @description Use this instance throughout the application for S3 operations
 */
export const s3Service = new S3Service();
