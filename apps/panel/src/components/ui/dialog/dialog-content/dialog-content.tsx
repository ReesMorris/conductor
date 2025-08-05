'use client';

import { cx } from '@/styled-system/css';
import {
  Content as RadixAlertDialogContent,
  Overlay as RadixAlertDialogOverlay,
  Portal as RadixAlertDialogPortal
} from '@radix-ui/react-alert-dialog';
import {
  Content as RadixDialogContent,
  Overlay as RadixDialogOverlay,
  Portal as RadixDialogPortal
} from '@radix-ui/react-dialog';
import { useDialogContext } from '../dialog-context';
import { styles } from './dialog-content.styles';
import type { DialogContentProps } from './dialog-content.types';

export const DialogContent: React.FC<DialogContentProps> = ({
  size,
  forceMount,
  className,
  children
}) => {
  const { role } = useDialogContext();

  if (role === 'dialog') {
    return (
      <RadixDialogPortal forceMount={forceMount || undefined}>
        <RadixDialogOverlay className={styles.overlay} />
        <RadixDialogContent className={cx(styles.content, className)}>
          <div className={styles.container({ size })}>{children}</div>
        </RadixDialogContent>
      </RadixDialogPortal>
    );
  }

  return (
    <RadixAlertDialogPortal forceMount={forceMount || undefined}>
      <RadixAlertDialogOverlay className={styles.overlay} />
      <RadixAlertDialogContent className={cx(styles.content, className)}>
        <div className={styles.container({ size })}>{children}</div>
      </RadixAlertDialogContent>
    </RadixAlertDialogPortal>
  );
};
