import type { ReactNode } from 'react';

export interface DialogFooterProps {
  /**
   * The footer content (typically Dialog.Cancel and Dialog.Action buttons)
   */
  children: ReactNode;

  /**
   * Optional className for the footer
   */
  className?: string;
}
