'use client';

import { Field, Input } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import type { ProjectSettingsFormData } from '../project-settings.schema';
import type { ProjectTokenFieldProps } from './project-token-field.types';

export const ProjectTokenField: React.FC<ProjectTokenFieldProps> = ({
  data
}) => {
  const { register, formState } = useFormContext<ProjectSettingsFormData>();
  const { formatMessage } = useFormatMessage();

  // Determine the placehodler based on the data
  const placeholder = data?.projectTokenSet
    ? `****-${data.projectTokenLastChars}`
    : 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

  return (
    <Field
      label={formatMessage('Project Token')}
      errorMessage={formState.errors.projectToken?.message?.toString()}
      helpText={
        data?.projectTokenSet
          ? formatMessage('Enter a new token to replace the existing one')
          : formatMessage('Enter your Railway project token')
      }
    >
      <Input
        {...register('projectToken')}
        placeholder={placeholder}
        disabled={formState.isSubmitting}
        aria-busy={formState.isSubmitting || undefined}
      />
    </Field>
  );
};
