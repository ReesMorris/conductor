'use client';

import { Avatar, Label } from '@/components/ui';
import { useToast, useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { useState } from 'react';
import { SettingsSection } from '../../components';
import { styles } from './profile-photo.styles';
import { RemovePhotoButton } from './remove-photo-button';
import { UploadPhotoButton } from './upload-photo-button';

export const ProfilePhoto: React.FC = () => {
  const { formatMessage } = useFormatMessage();
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
      toast.success(formatMessage('Profile photo changed'));
    } catch {
      // Show error toast
      toast.error(formatMessage('Failed to upload photo'));
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
      toast.success(formatMessage('Profile photo removed'));
    } catch {
      // Show error toast
      toast.error(formatMessage('Failed to remove photo'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsSection label={formatMessage('Profile Photo')}>
      <div className={styles.row}>
        <div
          className={styles.avatarContainer}
          data-loading={isLoading || undefined}
        >
          <Avatar size='2xl' src={user?.image} alt={user?.name ?? ''} />
        </div>
        <div className={styles.content}>
          <div>
            <Label>{formatMessage('Upload a new photo')}</Label>
            <div className={styles.helpText}>
              {formatMessage('JPG, PNG or GIF. Max size 2MB.')}
            </div>
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
    </SettingsSection>
  );
};
