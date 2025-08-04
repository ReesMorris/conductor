'use client';

import { Field, Input } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import validator from 'validator';
import type { FormData } from '../email-settings-form';

export const EmailField: React.FC = () => {
  const { register, formState } = useFormContext<FormData>();
  const { formatMessage } = useFormatMessage();

  return (
    <Field
      label={formatMessage('Email Address')}
      errorMessage={formState.errors.email?.message?.toString()}
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
        disabled={formState.isSubmitting}
        aria-busy={formState.isSubmitting || undefined}
      />
    </Field>
  );
};
