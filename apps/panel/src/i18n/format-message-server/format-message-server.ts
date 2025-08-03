import type { RichTagsFunction } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateHash } from '../format-message/hash';

/**
 * Server-side formatMessage function for React Server Components
 * Uses hash-based message IDs for cleaner code
 *
 * @example
 * const message = await formatMessageServer('Remove Profile Photo');
 * const greeting = await formatMessageServer('Hello {name}', { name: 'World' });
 */
export const formatMessageServer = async (
  message: string,
  params?: Record<string, string | number | RichTagsFunction | Date>
): Promise<string> => {
  const t = await getTranslations();
  const hash = generateHash(message);

  // Fallback to the original message if translation not found
  try {
    return t.rich(hash, params) as string;
  } catch {
    // In development, this helps identify missing translations
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation for: "${message}" (${hash})`);
    }
    return message;
  }
};
