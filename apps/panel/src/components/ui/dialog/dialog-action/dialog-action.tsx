'use client';

import { Action } from '@radix-ui/react-alert-dialog';
import { useDialogContext } from '../dialog-context';
import type { DialogActionProps } from './dialog-action.types';

export const DialogAction: React.FC<DialogActionProps> = ({
  asChild = false,
  children
}) => {
  const { role } = useDialogContext();

  // Only alert dialogs have Action button
  if (role === 'alertdialog') {
    return <Action asChild={asChild}>{children}</Action>;
  }

  // For regular dialogs, just render the children
  // The action should close the dialog using onOpenChange
  return <>{children}</>;
};
