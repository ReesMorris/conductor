import { isImageFile } from './is-image-file';

/**
 * Create object URL for file preview (with cleanup reminder)
 */
export const createFilePreview = (file: File): string | null => {
  if (!isImageFile(file)) {
    return null;
  }
  return URL.createObjectURL(file);
};
