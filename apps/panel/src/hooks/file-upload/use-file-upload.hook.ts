'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { useEffect, useRef, useState } from 'react';
import type {
  UseFileUploadOptions,
  UseFileUploadReturn
} from './use-file-upload.types';
import { createFilePreview, validateFile } from './utils';

/**
 * Hook for managing file uploads with validation, preview generation, and cleanup
 *
 * @param options - Configuration options for the file upload behavior
 * @returns Object containing file state, handlers, and utilities
 */
export const useFileUpload = (
  options: UseFileUploadOptions = {}
): UseFileUploadReturn => {
  const { multiple = false, validation = {}, onFileSelect, onError } = options;
  const { formatMessage } = useFormatMessage();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setError(null);

    // Convert FileList to array
    const fileArray = Array.from(files);

    // For single file mode, only take the first file
    const filesToProcess = multiple ? fileArray : [fileArray[0]];

    // Validate each file
    const validFiles: File[] = [];
    for (const file of filesToProcess) {
      const validationResult = validateFile(file, validation);
      if (!validationResult.valid && validationResult.error) {
        const {
          maxSize = 0,
          minSize = 0,
          extensions = ''
        } = validationResult.error.data || {};
        let errorMessage = '';

        switch (validationResult.error.code) {
          case 'FILE_TOO_LARGE': {
            errorMessage = formatMessage(
              'File must be less than {maxSize} bytes',
              { maxSize }
            );
            break;
          }
          case 'FILE_TOO_SMALL': {
            errorMessage = formatMessage(
              'File must be greater than {minSize} bytes',
              { minSize }
            );
            break;
          }
          case 'INVALID_TYPE': {
            errorMessage = formatMessage(
              'Invalid file type. Allowed types are: {extensions}',
              { extensions }
            );
            break;
          }
          default: {
            errorMessage = formatMessage('Unknown error occurred');
          }
        }

        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        return;
      }
      validFiles.push(file);
    }

    // Update state with valid files
    setSelectedFiles(validFiles);

    // Create preview URLs for image files
    const newPreviewUrls = validFiles
      .map(file => createFilePreview(file))
      .filter(Boolean) as string[];
    setPreviewUrls(newPreviewUrls);

    // Call onFileSelect callback
    if (onFileSelect) {
      onFileSelect(validFiles);
    }
  };

  const openFilePicker = () => {
    // Clear the input value to ensure onChange fires even for same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    // Clean up preview URL
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }

    setPreviewUrls(prev => {
      const newUrls = [...prev];
      newUrls.splice(index, 1);
      return newUrls;
    });

    // Clear error when removing files
    setError(null);

    // Clear input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearFiles = () => {
    setSelectedFiles([]);

    // Clean up all preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);

    setError(null);

    // Clear input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return {
    selectedFiles,
    previewUrls,
    fileInputRef,
    handleFileSelect,
    openFilePicker,
    removeFile,
    clearFiles,
    error
  };
};
