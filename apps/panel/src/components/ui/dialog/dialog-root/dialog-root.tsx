'use client';

import { Root as RadixAlertDialogRoot } from '@radix-ui/react-alert-dialog';
import { Root as RadixDialogRoot } from '@radix-ui/react-dialog';
import { DialogProvider } from '../dialog-context';
import type { DialogRootProps } from './dialog-root.types';

export const DialogRoot: React.FC<DialogRootProps> = ({
  role = 'dialog',
  children,
  ...props
}) => {
  const Root = role === 'alertdialog' ? RadixAlertDialogRoot : RadixDialogRoot;

  return (
    <Root {...props}>
      <DialogProvider value={{ role }}>{children}</DialogProvider>
    </Root>
  );
};
