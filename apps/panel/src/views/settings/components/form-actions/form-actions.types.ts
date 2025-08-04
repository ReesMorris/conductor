export interface FormActionsProps {
  /**
   * Indicates if the form has unsaved changes
   */
  isDirty?: boolean;

  /**
   * Indicates if the form is currently being submitted
   */
  isSubmitting?: boolean;

  /**
   * Callback function to reset the form to its initial state
   */
  onReset?: () => void;

  /**
   * Label for the cancel button
   * @default 'Cancel' (localised)
   */
  cancelLabel?: string;

  /**
   * Label for the save button
   * @default 'Save Changes' (localised)
   */
  saveLabel?: string;
}
