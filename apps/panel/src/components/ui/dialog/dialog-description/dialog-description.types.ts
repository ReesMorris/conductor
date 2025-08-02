import type { ReactNode } from 'react';

export interface DialogDescriptionProps {
  /**
   * The description content
   */
  children: ReactNode;

  /**
   * Optional className for the description
   */
  className?: string;

  /**
   * Change the default rendered element for the one passed as a child
   * @default false
   */
  asChild?: boolean;
}
