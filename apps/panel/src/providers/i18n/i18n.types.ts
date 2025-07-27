import type { Locale } from '@/constants';

export interface I18nProviderProps {
  /**
   * The locale to use for internationalization.
   */
  locale: Locale;

  /**
   * The children components to render within the provider.
   */
  children: React.ReactNode;
}
