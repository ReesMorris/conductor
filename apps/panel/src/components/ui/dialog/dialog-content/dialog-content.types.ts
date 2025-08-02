import type { ReactNode } from 'react';

export interface DialogContentProps {
  /**
   * The content of the dialog
   */
  children: ReactNode;

  /**
   * Optional className for the content
   */
  className?: string;

  /**
   * Whether to force mount the content
   */
  forceMount?: boolean;
}
