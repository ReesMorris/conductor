'use client';

import type { FormRef, HandleSubmit } from '@/components/ui';
import { Form } from '@/components/ui';
import { useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import {
  type WorkspaceSettingsFormData,
  workspaceSettingsSchema
} from '../workspace-settings.schema';
import type { WorkspaceSettingsFormProps } from './workspace-settings-form.types';

export const WorkspaceSettingsForm: React.FC<WorkspaceSettingsFormProps> = ({
  initialData,
  children,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();
  const formRef = useRef<FormRef<WorkspaceSettingsFormData>>(null);
  const toast = useToast();
  const utils = trpc.useUtils();

  // Mutation to update the workspace settings
  const updateSettingsMutation = trpc.workspace.updateSettings.useMutation({
    onSuccess: data => {
      // Update the cached data with the new configuration
      utils.workspace.getSettings.setData(undefined, data);

      // Notify the user of the successful update
      toast.success(formatMessage('Settings updated successfully'));

      // Reset form with new default values to clear dirty state
      formRef.current?.reset({
        registrationEnabled: data.registrationEnabled
      });
    },
    onError: error => {
      toast.error(
        formatMessage('Failed to update workspace settings'),
        error.message
      );
    }
  });

  const handleSubmit: HandleSubmit<WorkspaceSettingsFormData> = async ({
    changedData
  }) => {
    await updateSettingsMutation.mutateAsync(changedData);
  };

  return (
    <Form<WorkspaceSettingsFormData>
      {...props}
      ref={formRef}
      defaultValues={{
        registrationEnabled: initialData.registrationEnabled
      }}
      resolver={zodResolver(workspaceSettingsSchema())}
      onSubmit={handleSubmit}
    >
      {children}
    </Form>
  );
};
