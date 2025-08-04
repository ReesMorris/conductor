'use client';

import { Field, Input } from '@/components/ui';
import { useFormField } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import validator from 'validator';
import type { EmailFieldProps } from './email-field.types';

export const EmailField: React.FC<EmailFieldProps> = ({ disabled }) => {
  const { register, error, isLoading } = useFormField('email');
  const { formatMessage } = useFormatMessage();

  return (
    <Field
      label={formatMessage('Email Address')}
      errorMessage={error?.message?.toString()}
    >
      <Input
        {...register('email', {
          required: formatMessage('Email is required'),
          validate: value =>
            validator.isEmail(value) ||
            formatMessage('Please enter a valid email address')
        })}
        type='email'
        placeholder={formatMessage('alex.smith@example.com')}
        autoComplete='email'
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
      />
    </Field>
  );
};
