import type { UseFormWithActionBarReturn } from '@/hooks/form-with-action-bar';
import type { ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';

export interface FormWithActionBarProps<
  TFieldValues extends FieldValues = FieldValues
> {
  /**
   * The form instance returned by useFormWithActionBar
   */
  form: UseFormWithActionBarReturn<TFieldValues>;

  /**
   * The form fields to render
   */
  children: ReactNode;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional ID for the form element
   */
  id?: string;
}
