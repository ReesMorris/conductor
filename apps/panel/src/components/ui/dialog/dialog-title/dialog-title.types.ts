import type { ReactNode } from 'react';

export interface DialogTitleProps {
  /**
   * The title content
   */
  children: ReactNode;

  /**
   * Optional className for the title
   */
  className?: string;

  /**
   * Change the default rendered element for the one passed as a child
   * @default false
   */
  asChild?: boolean;
}
