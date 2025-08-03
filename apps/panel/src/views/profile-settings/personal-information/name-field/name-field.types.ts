import type { FieldError, UseFormRegister } from 'react-hook-form';

export interface NameFieldProps {
  /**
   * React Hook Form register function
   */
  register: UseFormRegister<any>;

  /**
   * Field error object from react-hook-form
   */
  error?: FieldError;

  /**
   * Whether the field is disabled
   */
  disabled?: boolean;

  /**
   * Whether the field is in a loading/saving state
   */
  isLoading?: boolean;
}
