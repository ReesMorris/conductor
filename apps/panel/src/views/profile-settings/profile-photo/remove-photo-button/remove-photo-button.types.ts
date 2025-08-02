export interface RemovePhotoButtonProps {
  /**
   * Whether the user has a photo to remove
   */
  hasPhoto: boolean;

  /**
   * Whether the remove operation is in progress
   */
  isLoading?: boolean;

  /**
   * Callback when the user confirms photo removal
   */
  onConfirm: () => void | Promise<void>;
}
