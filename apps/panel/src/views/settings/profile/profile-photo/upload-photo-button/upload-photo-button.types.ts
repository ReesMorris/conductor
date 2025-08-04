export interface UploadPhotoButtonProps {
  /**
   * Whether the user currently has a photo
   */
  hasPhoto: boolean;

  /**
   * Whether any operation is currently in progress
   */
  isLoading?: boolean;

  /**
   * Callback when user selects a file
   * @param file - The selected file
   */
  onFileSelect: (file: File) => void;
}
