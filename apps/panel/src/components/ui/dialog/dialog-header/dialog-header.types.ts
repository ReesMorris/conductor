import type { ReactNode } from 'react';

export interface DialogHeaderProps {
  /**
   * The header content (typically Dialog.Title and Dialog.Description)
   */
  children: ReactNode;

  /**
   * Optional className for the header
   */
  className?: string;
}
