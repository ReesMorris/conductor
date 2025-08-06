'use client';

import { Field, Input } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import type { ProjectSettingsFormData } from '../project-settings.schema';
import type { AccessTokenFieldProps } from './access-token-field.types';

export const AccessTokenField: React.FC<AccessTokenFieldProps> = ({ data }) => {
  const { register, formState } = useFormContext<ProjectSettingsFormData>();
  const { formatMessage } = useFormatMessage();

  return (
    <Field
      label={formatMessage('Personal Access Token')}
      errorMessage={formState.errors.accessToken?.message?.toString()}
      helpText={formatMessage(
        'Enter a new token to replace the existing one. Your token is encrypted and stored securely.'
      )}
    >
      <Input
        {...register('accessToken')}
        placeholder={`****-****-****-${data.accessTokenLastChars}`}
        disabled={formState.isSubmitting}
        aria-busy={formState.isSubmitting || undefined}
      />
    </Field>
  );
};
