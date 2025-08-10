export interface AddServerDialogProps {
  /**
   * Indicates whether the dialog is open or closed.
   */
  open: boolean;

  /**
   * Callback function to be called when the dialog is closed.
   */
  onOpenChange: (isOpen: boolean) => void;

  /**
   * Callback function to be called after successful server deployment.
   */
  onSuccess?: () => void;
}
