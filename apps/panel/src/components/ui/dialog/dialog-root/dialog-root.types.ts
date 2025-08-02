import type { ReactNode } from 'react';

export interface DialogRootProps {
  /**
   * The controlled open state of the dialog
   */
  open?: boolean;

  /**
   * Event handler called when the open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The modality of the dialog
   * @default true
   */
  modal?: boolean;

  /**
   * The role of the dialog
   * - 'dialog': Regular dialog that can be dismissed
   * - 'alertdialog': Alert dialog that requires explicit action
   * @default 'dialog'
   */
  role?: 'dialog' | 'alertdialog';

  /**
   * The dialog content and trigger
   */
  children: ReactNode;
}
