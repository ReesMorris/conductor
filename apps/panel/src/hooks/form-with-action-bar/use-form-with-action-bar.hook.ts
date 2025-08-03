'use client';

import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type {
  UseFormWithActionBarOptions,
  UseFormWithActionBarReturn
} from './use-form-with-action-bar.types';

export const useFormWithActionBar = <
  TFieldValues extends FieldValues = FieldValues
>({
  onSave,
  onCancel,
  saveLabel,
  cancelLabel,
  ...formOptions
}: UseFormWithActionBarOptions<TFieldValues>): UseFormWithActionBarReturn<TFieldValues> => {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<TFieldValues>(formOptions);
  const { handleSubmit, reset, formState } = form;
  const { isDirty } = formState;

  // Handler for saving the form
  const handleSave = useCallback(() => {
    // Don't save if form is not dirty
    if (!isDirty) {
      return;
    }

    handleSubmit(async data => {
      setIsSaving(true);
      try {
        await onSave(data);
        reset(data); // Reset form to clean state after successful save
      } catch (error) {
        // Error handling is left to the onSave implementation
        console.error('Form save error:', error);
      } finally {
        setIsSaving(false);
      }
    })();
  }, [handleSubmit, onSave, reset, isDirty]);

  // Handler for cancelling changes
  const handleCancel = useCallback(() => {
    reset(); // Reset form to original values
    onCancel?.(); // Call optional onCancel callback
  }, [reset, onCancel]);

  const actionBarProps = {
    open: isDirty,
    onSave: handleSave,
    onCancel: handleCancel,
    saveLabel,
    cancelLabel,
    isLoading: isSaving
  };

  return {
    ...form,
    actionBarProps,
    isSaving,
    handleSave,
    handleCancel
  };
};
