'use client';

import { Avatar, Heading, Label } from '@/components/ui';
import { useToast, useUser } from '@/hooks';
import { trpc } from '@/providers/trpc';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { styles } from './profile-photo.styles';
import { RemovePhotoButton } from './remove-photo-button';
import { UploadPhotoButton } from './upload-photo-button';

export const ProfilePhoto: React.FC = () => {
  const t = useTranslations('profile_settings.profile_photo');
  const { user, updateUser } = useUser();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getPresignedUrl = trpc.profile.photo.getPresignedUrl.useMutation();
  const updatePhoto = trpc.profile.photo.upload.useMutation();
  const removePhoto = trpc.profile.photo.remove.useMutation();

  // Function to handle file selection and upload
  const onFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      // Step 1: Get presigned URL from our API
      const { uploadUrl, key } = await getPresignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      // Step 2: Upload file to S3/MinIO
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

      // Show success toast
      toast.success(t('upload_success'));
    } catch (_err) {
      // Show error toast
      toast.error(t('upload_error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle photo removal
  const onRemovePhoto = async () => {
    setIsLoading(true);
    try {
      await removePhoto.mutateAsync();

      // Update the store to clear the image
      updateUser({ image: null });

      // Show success toast
      toast.success(t('remove_success'));
    } catch {
      // Show error toast
      toast.error(t('remove_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading level={2}>{t('title')}</Heading>

      <div className={styles.row}>
        <div
          className={styles.avatarContainer}
          data-loading={isLoading || undefined}
        >
          <Avatar size='2xl' src={user?.image} />
        </div>
        <div className={styles.content}>
          <div>
            <Label>{t('label')}</Label>
            <div className={styles.helpText}>{t('help_text')}</div>
          </div>
          <div>
            {user?.image ? (
              <div className={styles.buttonGroup}>
                <UploadPhotoButton
                  hasPhoto={!!user?.image}
                  isLoading={isLoading}
                  onFileSelect={onFileSelect}
                />
                <RemovePhotoButton
                  hasPhoto={!!user?.image}
                  isLoading={isLoading}
                  onConfirm={onRemovePhoto}
                />
              </div>
            ) : (
              <UploadPhotoButton
                hasPhoto={false}
                isLoading={isLoading}
                onFileSelect={onFileSelect}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
