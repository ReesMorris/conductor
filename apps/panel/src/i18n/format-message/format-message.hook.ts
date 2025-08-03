import { useTranslations } from 'next-intl';
import type {
  FormatMessageFunction,
  UseFormatMessageReturn
} from './format-message.types';
import { generateHash } from './hash';

/**
 * Hook that provides a formatMessage function for internationalization
 * Uses hash-based message IDs for cleaner code
 *
 * @example
 * const { formatMessage } = useFormatMessage();
 * const text = formatMessage('Remove Profile Photo');
 */
export const useFormatMessage = (): UseFormatMessageReturn => {
  const t = useTranslations();

  const formatMessage: FormatMessageFunction = (message, params) => {
    const hash = generateHash(message);
    // Fallback to the original message if translation not found
    try {
      return t.rich(hash, params) as string; // technically not true, but easier to handle
    } catch {
      // In development, this helps identify missing translations
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation for: "${message}" (${hash})`);
      }
      return message;
    }
  };

  return { formatMessage };
};
