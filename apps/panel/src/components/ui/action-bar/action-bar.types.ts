export interface ActionBarProps {
  /**
   * Controls the visibility of the action bar
   */
  open: boolean;

  /**
   * Callback function called when the cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Callback function called when the save button is clicked
   */
  onSave?: () => void;

  /**
   * Custom label for the cancel button
   * @default 'Cancel'
   */
  cancelLabel?: string;

  /**
   * Custom label for the save button
   * @default 'Save'
   */
  saveLabel?: string;

  /**
   * Loading state for the save button
   */
  isLoading?: boolean;

  /**
   * Custom content to render in the action bar
   */
  children?: React.ReactNode;
}
