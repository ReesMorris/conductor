import type { ReactNode } from 'react';

export interface DialogCancelProps {
  /**
   * Change the default rendered element for the one passed as a child
   * @default false
   */
  asChild?: boolean;

  /**
   * The cancel button content
   */
  children: ReactNode;
}
