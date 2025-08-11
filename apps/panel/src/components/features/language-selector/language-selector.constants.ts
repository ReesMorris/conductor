import type { Locale } from '@/constants';

export interface Language {
  code: Locale;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English'
  }
];
