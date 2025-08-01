/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? (parts.at(-1) ?? '').toLowerCase() : '';
};
