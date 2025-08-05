'use client';

import { Field, Input } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import type { ProjectSettingsFormData } from '../project-settings.schema';

export const ProjectTokenField: React.FC = () => {
  const { register, formState } = useFormContext<ProjectSettingsFormData>();
  const { formatMessage } = useFormatMessage();

  return (
    <Field
      label={formatMessage('Project Token')}
      errorMessage={formState.errors.projectToken?.message?.toString()}
    >
      <Input
        {...register('projectToken')}
        placeholder={'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'}
        disabled={formState.isSubmitting}
        aria-busy={formState.isSubmitting || undefined}
      />
    </Field>
  );
};
