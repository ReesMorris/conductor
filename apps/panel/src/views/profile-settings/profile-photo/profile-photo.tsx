'use client';

import { Avatar, Button, Heading, IconButton, Label } from '@/components/ui';
import { useFileUpload, useSession } from '@/hooks';
import { TrashIcon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { styles } from './profile-photo.styles';

export const ProfilePhoto: React.FC = () => {
  const { data } = useSession();
  const t = useTranslations('profile_settings.profile_photo');
  const inputId = useId();

  const {
    selectedFiles,
    previewUrls,
    fileInputRef,
    handleFileSelect,
    openFilePicker,
    clearFiles
  } = useFileUpload({
    multiple: false,
    validation: {
      acceptedTypes: ['image/jpeg', 'image/png', 'image/gif'],
      maxSize: 2 * 1024 * 1024 // 2MB
    }
  });

  const selectedFile = selectedFiles[0];
  const previewUrl = previewUrls[0];

  return (
    <>
      <Heading level={2}>{t('title')}</Heading>

      <div className={styles.row}>
        <div className={styles.avatarContainer}>
          <Avatar
            size='2xl'
            src={previewUrl || data?.user.image}
            fallback={data?.user.name}
          />
        </div>
        <div className={styles.content}>
          <div>
            <Label htmlFor={inputId}>
              {selectedFile ? t('label') : t('label')}
            </Label>
            <div className={styles.helpText}>{t('help_text')}</div>
          </div>
          <div>
            <input
              id={inputId}
              ref={fileInputRef}
              type='file'
              accept='image/jpeg,image/png,image/gif'
              onChange={handleFileSelect}
              className={styles.hiddenInput}
            />
            {selectedFile ? (
              <div className={styles.buttonGroup}>
                <Button variant='outlined' onClick={openFilePicker}>
                  <UploadIcon />
                  {t('change_button')}
                </Button>
                <IconButton
                  variant='destructive'
                  aria-label={t('remove_button')}
                  onClick={clearFiles}
                >
                  <TrashIcon />
                </IconButton>
              </div>
            ) : (
              <Button variant='outlined' onClick={openFilePicker}>
                <UploadIcon />
                {t('upload_button')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
