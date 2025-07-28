import type { DialogProps } from '@/components/ui';

export interface LanguageSelectorProps
  extends Omit<DialogProps, 'title' | 'description' | 'children'> {
  /**
   * Callback when language is changed
   */
  onLanguageChange?: (locale: string) => void;
}
