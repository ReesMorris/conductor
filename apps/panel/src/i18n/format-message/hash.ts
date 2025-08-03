import { createHash } from 'crypto';

/**
 * Generates a stable hash from a message string
 * Used to create consistent IDs for translation keys
 *
 * @param message - The message string to hash
 * @returns 8-character hex hash
 */
export const generateHash = (message: string): string => {
  return createHash('sha256').update(message).digest('hex').substring(0, 8);
};
