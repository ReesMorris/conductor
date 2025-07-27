export const LOCALES = ['en', 'it'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = 'en' as const;
