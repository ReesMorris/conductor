'use client';

import type { FormRef, HandleSubmit } from '@/components/ui';
import { Form } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import {
  type ProjectSettingsFormData,
  projectSettingsSchema
} from '../project-settings.schema';
import type { ProjectSettingsFormProps } from './project-settings-form.types';

export const ProjectSettingsForm: React.FC<ProjectSettingsFormProps> = ({
  children,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();
  const formRef = useRef<FormRef<ProjectSettingsFormData>>(null);

  const handleSubmit: HandleSubmit<ProjectSettingsFormData> = () => {
    // TODO: Implement form submission logic
  };

  return (
    <Form<ProjectSettingsFormData>
      {...props}
      ref={formRef}
      defaultValues={{
        projectToken: ''
      }}
      resolver={zodResolver(
        projectSettingsSchema({
          invalidProjectToken: formatMessage(
            'Project Token must be a valid UUID v4'
          )
        })
      )}
      onSubmit={handleSubmit}
    >
      {children}
    </Form>
  );
};
