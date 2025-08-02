'use client';

import { VisuallyHidden } from '@/styled-system/jsx';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Toast as RadixToast } from 'radix-ui';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { styles } from './toast.styles';
import type { ToastProps } from './toast.types';

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  icon,
  variant,
  action,
  duration,
  onDismiss
}) => {
  const t = useTranslations('ui');

  // Handle open change to dismiss toast when closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss();
    }
  };

  return (
    <RadixToast.Root
      className={styles.root({ variant })}
      duration={duration}
      onOpenChange={handleOpenChange}
    >
      {icon && <div className={styles.icon}>{icon}</div>}

      {title && (
        <RadixToast.Title className={styles.title}>{title}</RadixToast.Title>
      )}

      {description && (
        <RadixToast.Description className={styles.description}>
          {description}
        </RadixToast.Description>
      )}

      {action && (
        <RadixToast.Action altText={action.label} asChild>
          <Button variant='outlined' size='sm' onClick={action.onClick}>
            {action.label}
          </Button>
        </RadixToast.Action>
      )}

      <VisuallyHidden>
        <RadixToast.Close asChild className={styles.close}>
          <IconButton variant='ghost' size='sm' aria-label={t('close')}>
            <XIcon />
          </IconButton>
        </RadixToast.Close>
      </VisuallyHidden>
    </RadixToast.Root>
  );
};
