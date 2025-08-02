'use client';

import { cx } from '@/styled-system/css';
import { Description as RadixAlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { Description as RadixDialogDescription } from '@radix-ui/react-dialog';
import { useDialogContext } from '../dialog-context';
import { styles } from './dialog-description.styles';
import type { DialogDescriptionProps } from './dialog-description.types';

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
  className,
  asChild = false
}) => {
  const { role } = useDialogContext();

  const Description =
    role === 'dialog' ? RadixDialogDescription : RadixAlertDialogDescription;

  return (
    <Description
      asChild={asChild}
      className={asChild ? className : cx(styles.description, className)}
    >
      {children}
    </Description>
  );
};
