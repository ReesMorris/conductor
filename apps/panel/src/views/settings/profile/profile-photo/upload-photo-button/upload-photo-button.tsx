'use client';

import { Button } from '@/components/ui';
import { useFileUpload } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { UploadIcon } from 'lucide-react';
import { useId } from 'react';
import { styles } from '../profile-photo.styles';
import type { UploadPhotoButtonProps } from './upload-photo-button.types';

export const UploadPhotoButton: React.FC<UploadPhotoButtonProps> = ({
  hasPhoto,
  isLoading = false,
  onFileSelect
}) => {
  const { formatMessage } = useFormatMessage();
  const inputId = useId();

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const {
    fileInputRef,
    handleFileSelect: handleFileChange,
    openFilePicker
  } = useFileUpload({
    multiple: false,
    validation: {
      acceptedTypes: ['image/jpeg', 'image/png', 'image/gif'],
      maxSize: 2 * 1024 * 1024 // 2MB
    },
    onFileSelect: handleFileSelect
  });

  return (
    <>
      <input
        id={inputId}
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/png,image/gif'
        onChange={handleFileChange}
        className={styles.hiddenInput}
        disabled={isLoading}
      />
      <Button variant='outlined' onClick={openFilePicker} isLoading={isLoading}>
        <UploadIcon />
        {hasPhoto
          ? formatMessage('Change Photo')
          : formatMessage('Upload Photo')}
      </Button>
    </>
  );
};
