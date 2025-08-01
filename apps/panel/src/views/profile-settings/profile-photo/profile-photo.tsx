'use client';

import { Avatar, Button, Heading, IconButton, Label } from '@/components/ui';
import { useFileUpload, useUser } from '@/hooks';
import { trpc } from '@/providers/trpc';
import { TrashIcon, UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { styles } from './profile-photo.styles';

export const ProfilePhoto: React.FC = () => {
  const { user, updateUser } = useUser();
  const t = useTranslations('profile_settings.profile_photo');
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);

  const getPresignedUrl = trpc.profile.getPresignedUrl.useMutation();
  const updatePhoto = trpc.profile.uploadPhoto.useMutation();

  // Function to handle file selection and upload
  const onFileSelect = async (files: File[]) => {
    const file = files[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    try {
      // Step 1: Get presigned URL from our API
      const { uploadUrl, key } = await getPresignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      // Step 2: Upload file to S3/MinIO
      // TODO: Use BetterFetch (?)
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      // Step 3: Confirm upload and update user profile
      const result = await updatePhoto.mutateAsync({ key });

      // Update the store with the new image URL
      updateUser({ image: result.user.image });

      // TODO: Show success toast
      console.log('Photo uploaded successfully');
    } catch (error) {
      // TODO: Show error toast
      console.error('Failed to upload photo:', error);
      clearFiles();
    } finally {
      setIsUploading(false);
    }
  };

  const {
    selectedFiles,
    fileInputRef,
    handleFileSelect,
    openFilePicker,
    clearFiles
  } = useFileUpload({
    multiple: false,
    validation: {
      acceptedTypes: ['image/jpeg', 'image/png', 'image/gif'],
      maxSize: 2 * 1024 * 1024 // 2MB
    },
    onFileSelect
  });

  const selectedFile = selectedFiles[0];

  return (
    <>
      <Heading level={2}>{t('title')}</Heading>

      <div className={styles.row}>
        <div
          className={styles.avatarContainer}
          data-loading={isUploading || undefined}
        >
          <Avatar size='2xl' src={user?.image} fallback={user?.name} />
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
            {selectedFile || user?.image ? (
              <div className={styles.buttonGroup}>
                <Button
                  variant='outlined'
                  onClick={openFilePicker}
                  isLoading={isUploading}
                >
                  <UploadIcon />
                  {t('change_button')}
                </Button>
                <IconButton
                  variant='destructive'
                  aria-label={t('remove_button')}
                  onClick={clearFiles}
                  disabled={isUploading}
                >
                  <TrashIcon />
                </IconButton>
              </div>
            ) : (
              <Button
                variant='outlined'
                onClick={openFilePicker}
                disabled={isUploading}
              >
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
