import type { Dialog as RadixDialog } from 'radix-ui';

export interface DialogProps extends RadixDialog.DialogProps {
  /**
   * The title content displayed at the top of the dialog
   */
  title: React.ReactNode;

  /**
   * Optional description text displayed below the title
   */
  description?: React.ReactNode;

  /**
   * The main content of the dialog
   */
  children: React.ReactNode;

  /**
   * Trigger element that opens the dialog when clicked
   */
  trigger?: React.ReactNode;

  /**
   * Whether the trigger should use Radix UI's asChild pattern
   * @default false
   */
  triggerAsChild?: boolean;
}
