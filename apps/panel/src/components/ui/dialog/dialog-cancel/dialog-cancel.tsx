'use client';

import { Cancel } from '@radix-ui/react-alert-dialog';
import { Close } from '@radix-ui/react-dialog';
import { useDialogContext } from '../dialog-context';
import type { DialogCancelProps } from './dialog-cancel.types';

export const DialogCancel: React.FC<DialogCancelProps> = ({
  asChild = false,
  children
}) => {
  const { role } = useDialogContext();

  // For regular dialog, use Close
  if (role === 'dialog') {
    return <Close asChild={asChild}>{children}</Close>;
  }

  // For alert dialog, use Cancel
  return <Cancel asChild={asChild}>{children}</Cancel>;
};
