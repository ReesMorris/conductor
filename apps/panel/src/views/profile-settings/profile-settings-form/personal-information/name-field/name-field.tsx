'use client';

import { Field, Input } from '@/components/ui';
import { useFormField } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import type { NameFieldProps } from './name-field.types';

const NAME_PATTERN = /^[a-zA-Z\s\-']+$/;

export const NameField: React.FC<NameFieldProps> = ({ disabled }) => {
  const { register, error, isLoading } = useFormField('name');
  const { formatMessage } = useFormatMessage();

  return (
    <Field
      label={formatMessage('Your Name')}
      errorMessage={error?.message?.toString()}
    >
      <Input
        {...register('name', {
          required: formatMessage('Please enter your name'),
          minLength: {
            value: 2,
            message: formatMessage('Name must be at least {min} characters', {
              min: 2
            })
          },
          maxLength: {
            value: 50,
            message: formatMessage('Name must not exceed {max} characters', {
              max: 50
            })
          },
          pattern: {
            value: NAME_PATTERN,
            message: formatMessage(
              'Name can only contain letters, spaces, hyphens, and apostrophes'
            )
          }
        })}
        placeholder={formatMessage('Alex Smith')}
        autoComplete='name'
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
      />
    </Field>
  );
};
