import type { ReactNode } from 'react';

export interface DialogTriggerProps {
  /**
   * Change the default rendered element for the one passed as a child
   * @default false
   */
  asChild?: boolean;

  /**
   * The element that triggers the dialog
   */
  children: ReactNode;
}
