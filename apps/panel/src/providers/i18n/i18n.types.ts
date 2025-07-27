import type { Locale } from '@/i18n';

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
