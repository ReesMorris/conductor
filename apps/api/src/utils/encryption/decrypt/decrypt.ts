import crypto from 'node:crypto';
import { ENCRYPTION_ALGORITHM, ENCRYPTION_KEY } from '../encryption.constants';

/**
 * Decrypts a string encrypted with encrypt()
 * @param encryptedText - The encrypted string in format: iv:authTag:encrypted
 * @returns The decrypted plaintext
 */
export const decrypt = (encryptedText: string): string => {
  const parts = encryptedText.split(':');

  if (parts.length !== 3) {
    throw new Error('Invalid encrypted format');
  }

  const [ivHex, authTagHex, encrypted] = parts;

  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error('Invalid encrypted format');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    ENCRYPTION_KEY,
    iv
  );
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
