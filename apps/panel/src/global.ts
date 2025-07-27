// import { formats } from '@/i18n/request';
import type messages from '@/i18n/messages/en.json';
import type { Locale } from './i18n/i18n.types';

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
    // Formats: typeof formats;
  }
}
