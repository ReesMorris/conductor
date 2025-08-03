import { Field, Input } from '@/components/ui';
import type { NameFieldProps } from './name-field.types';

export const NameField: React.FC<NameFieldProps> = ({
  register,
  error,
  disabled,
  isLoading
}) => {
  return (
    <Field label='Your Name' errorMessage={error?.message}>
      <Input
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters'
          },
          maxLength: {
            value: 50,
            message: 'Name must not exceed 50 characters'
          },
          pattern: {
            value: /^[a-zA-Z\s\-']+$/,
            message:
              'Name can only contain letters, spaces, hyphens, and apostrophes'
          }
        })}
        placeholder='Enter your name'
        autoComplete='name'
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
      />
    </Field>
  );
};
