'use client';

import { Title as RadixAlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { Title as RadixDialogTitle } from '@radix-ui/react-dialog';
import { Heading } from '../../heading';
import { useDialogContext } from '../dialog-context';
import type { DialogTitleProps } from './dialog-title.types';

export const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className,
  asChild = false
}) => {
  const { role } = useDialogContext();

  const Title = role === 'dialog' ? RadixDialogTitle : RadixAlertDialogTitle;

  if (asChild) {
    return <Title asChild>{children}</Title>;
  }

  return (
    <Title asChild>
      <Heading level={2} className={className}>
        {children}
      </Heading>
    </Title>
  );
};
