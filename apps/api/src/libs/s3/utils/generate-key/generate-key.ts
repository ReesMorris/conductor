import { randomUUID } from 'node:crypto';
import { getFileExtension } from '../get-file-extension';
import type { GenerateKeyOptions } from './generate-key.types';

/**
 * Creates a secure key using UUID by default to prevent information
 * disclosure and ensure unpredictability. File extensions can be preserved for
 * content-type detection.
 *
 * @param options - Configuration options for key generation
 * @returns A unique S3 key
 * @throws If custom strategy is used without providing customId
 */
export const generateKey = (options: GenerateKeyOptions): string => {
  const {
    prefix,
    filename = '',
    strategy = 'uuid',
    customId,
    preserveExtension = true
  } = options;

  const extension =
    preserveExtension && filename ? getFileExtension(filename) : '';

  let identifier: string;

  switch (strategy) {
    case 'uuid':
      identifier = randomUUID();
      break;

    case 'timestamp':
      identifier = Date.now().toString();
      break;

    case 'custom':
      if (!customId) {
        throw new Error('customId is required when using custom strategy');
      }
      identifier = customId.replace(/[^a-zA-Z0-9-_]/g, '_');
      break;

    default:
      throw new Error(`Unknown strategy: ${strategy}`);
  }

  // Add dot before extension if extension exists
  const fullExtension = extension ? `.${extension}` : '';
  return `${prefix}/${identifier}${fullExtension}`;
};
