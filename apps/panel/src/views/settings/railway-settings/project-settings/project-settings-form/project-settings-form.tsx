'use client';

import type { FormRef, HandleSubmit } from '@/components/ui';
import { Form } from '@/components/ui';
import { useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import {
  type ProjectSettingsFormData,
  projectSettingsSchema
} from '../project-settings.schema';
import type { ProjectSettingsFormProps } from './project-settings-form.types';

export const ProjectSettingsForm: React.FC<ProjectSettingsFormProps> = ({
  initialData,
  children,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();
  const formRef = useRef<FormRef<ProjectSettingsFormData>>(null);
  const toast = useToast();
  const utils = trpc.useUtils();

  // Mutation to update the Railway project settings
  const updateRailwayMutation = trpc.railway.updateConfig.useMutation({
    onSuccess: data => {
      // Update the cached data with the new configuration
      utils.railway.getConfig.setData(undefined, data);

      // Notify the user of the successful update
      toast.success(formatMessage('Settings updated successfully'));

      // Reset form with new default values to clear dirty state
      formRef.current?.reset({
        projectToken: '' // always empty as this is not exposed to the user
      });
    },
    onError: error => {
      toast.error(
        formatMessage('Failed to update Railway configuration'),
        error.message
      );
    }
  });

  const handleSubmit: HandleSubmit<ProjectSettingsFormData> = async ({
    changedData
  }) => {
    await updateRailwayMutation.mutateAsync(changedData);
  };

  return (
    <Form<ProjectSettingsFormData>
      {...props}
      ref={formRef}
      defaultValues={{
        projectToken: '' // always empty as this is not exposed to the user
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
