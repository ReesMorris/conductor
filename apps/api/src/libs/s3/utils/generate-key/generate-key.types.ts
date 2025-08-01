/**
 * Strategy for generating S3 object keys
 */
export type KeyGenerationStrategy = 'uuid' | 'timestamp' | 'custom';

/**
 * Options for generating S3 object keys
 */
export interface GenerateKeyOptions {
  /**
   * The prefix path for the key (e.g., 'users/123/profile', 'backups/database')
   */
  prefix: string;

  /**
   * Optional filename to include. If using UUID strategy, only the extension is preserved
   */
  filename?: string;

  /**
   * Key generation strategy. Defaults to 'uuid' for security
   */
  strategy?: KeyGenerationStrategy;

  /**
   * Custom identifier to use when strategy is 'custom'
   */
  customId?: string;

  /**
   * Whether to preserve the file extension. Defaults to true
   */
  preserveExtension?: boolean;
}
