import type { ReactNode } from 'react';

export interface DialogActionProps {
  /**
   * Change the default rendered element for the one passed as a child
   * @default false
   */
  asChild?: boolean;

  /**
   * The action button content
   */
  children: ReactNode;
}
