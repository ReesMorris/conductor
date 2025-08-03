'use client';

import { Field, Input } from '@/components/ui';
import { useFormField } from '@/hooks';
import type { NameFieldProps } from './name-field.types';

const NAME_PATTERN = /^[a-zA-Z\s\-']+$/;

export const NameField: React.FC<NameFieldProps> = ({ disabled }) => {
  const { register, error, isLoading } = useFormField('name');

  return (
    <Field label='Your Name' errorMessage={error?.message?.toString()}>
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
            value: NAME_PATTERN,
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
