'use client';

import { Trigger as RadixAlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { Trigger as RadixDialogTrigger } from '@radix-ui/react-dialog';
import { useDialogContext } from '../dialog-context';
import type { DialogTriggerProps } from './dialog-trigger.types';

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  asChild = false,
  children
}) => {
  const { role } = useDialogContext();

  const Trigger =
    role === 'dialog' ? RadixDialogTrigger : RadixAlertDialogTrigger;

  return <Trigger asChild={asChild}>{children}</Trigger>;
};
