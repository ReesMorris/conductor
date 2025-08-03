import type { ActionBarProps } from '@/components/ui';
import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

export interface UseFormWithActionBarOptions<
  TFieldValues extends FieldValues = FieldValues
> extends UseFormProps<TFieldValues> {
  /**
   * Callback function called when the form is saved
   * @param data - The form data
   * @returns Promise that resolves when save is complete
   */
  onSave: (data: TFieldValues) => Promise<void>;

  /**
   * Optional callback function called when the form is cancelled
   */
  onCancel?: () => void;

  /**
   * Custom label for the save button
   * @default 'Save'
   */
  saveLabel?: string;

  /**
   * Custom label for the cancel button
   * @default 'Cancel'
   */
  cancelLabel?: string;
}

export interface UseFormWithActionBarReturn<
  TFieldValues extends FieldValues = FieldValues
> extends UseFormReturn<TFieldValues> {
  /**
   * Props to spread onto the ActionBar component
   */
  actionBarProps: Omit<ActionBarProps, 'children'>;

  /**
   * Loading state for the save operation
   */
  isSaving: boolean;

  /**
   * Handler for form submission
   */
  handleSave: () => void;

  /**
   * Handler for cancelling changes
   */
  handleCancel: () => void;
}
