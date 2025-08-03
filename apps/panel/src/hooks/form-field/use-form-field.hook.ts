'use client';

import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { UseFormWithActionBarReturn } from '../form-with-action-bar';

/**
 * Hook to access form field state from context
 * Combines React Hook Form's context with our custom isSaving state
 */
export const useFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  name: TName
) => {
  const context =
    useFormContext<TFieldValues>() as UseFormWithActionBarReturn<TFieldValues>;

  if (!context) {
    throw new Error('useFormField must be used within a FormWithActionBar');
  }

  const { register, formState, isSaving } = context;
  const { errors } = formState;

  return {
    register,
    error: errors[name],
    isLoading: isSaving
  };
};
