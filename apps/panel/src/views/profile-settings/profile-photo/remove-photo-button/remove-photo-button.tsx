'use client';

import { Button, Dialog, IconButton } from '@/components/ui';
import { TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { RemovePhotoButtonProps } from './remove-photo-button.types';

export const RemovePhotoButton: React.FC<RemovePhotoButtonProps> = ({
  hasPhoto,
  isLoading = false,
  onConfirm
}) => {
  const t = useTranslations('profile_settings.profile_photo');
  const [open, setOpen] = useState(false);

  // If there is no photo, we don't show the button
  if (!hasPhoto) {
    return null;
  }

  // Function to handle confirmation of photo removal
  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // don't close the dialog immediately
    await onConfirm();
    setOpen(false);
  };

  // Function to handle opening and closing of the dialog
  const handleOpenChange = (open: boolean) => {
    // Don't allow changing the dialog state if a request is in progress
    if (isLoading) {
      return;
    }

    setOpen(open);
  };

  return (
    <Dialog.Root role='alertdialog' open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <IconButton
          variant='destructive'
          aria-label={t('remove_button')}
          disabled={isLoading}
        >
          <TrashIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t('remove_dialog.title')}</Dialog.Title>
          <Dialog.Description>
            {t('remove_dialog.description')}
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Dialog.Cancel asChild>
            <Button variant='ghost' disabled={isLoading}>
              {t('remove_dialog.cancel_button')}
            </Button>
          </Dialog.Cancel>
          <Dialog.Action asChild>
            <Button
              type='button'
              variant='destructive'
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              {t('remove_dialog.confirm_button')}
            </Button>
          </Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
