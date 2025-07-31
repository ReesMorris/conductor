/**
 * Check if a file is an image based on MIME type
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};
