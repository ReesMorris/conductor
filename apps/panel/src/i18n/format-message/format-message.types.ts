import type { RichTagsFunction } from 'next-intl';

/**
 * Function signature for formatting messages
 */
export type FormatMessageFunction = (
  message: string,
  params?: Record<string, string | number | RichTagsFunction | Date>
) => string;

/**
 * Hook return type
 */
export interface UseFormatMessageReturn {
  formatMessage: FormatMessageFunction;
}
