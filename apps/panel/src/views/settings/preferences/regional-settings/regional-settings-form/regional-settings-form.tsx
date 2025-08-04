'use client';

import type { FormRef, HandleSubmit } from '@/components/ui';
import { Form } from '@/components/ui';
import { useToast, useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { useUserStore } from '@/stores';
import { useRef } from 'react';
import type { RegionalSettingsFormProps } from './regional-settings-form.types';

export interface FormData {
  timeZone: string;
}

export const RegionalSettingsForm: React.FC<RegionalSettingsFormProps> = ({
  children,
  ...props
}) => {
  const formRef = useRef<FormRef<FormData>>(null);
  const toast = useToast();
  const { user } = useUser();
  const { formatMessage } = useFormatMessage();
  const updateUser = useUserStore(state => state.updateUser);

  const updatePreferencesMutation =
    trpc.preferences.updatePreferences.useMutation({
      onSuccess: updatedUser => {
        // Update the user store with new preferences
        updateUser(updatedUser);

        // Notify the user of the successful update
        toast.success(formatMessage('Preferences updated successfully'));

        // Reset form with new default values to clear dirty state
        formRef.current?.reset({
          timeZone: updatedUser.timeZone || ''
        });
      },
      onError: error => {
        toast.error(
          formatMessage('Failed to update preferences'),
          error.message
        );
      }
    });

  const handleSubmit: HandleSubmit<FormData> = async ({ changedData }) => {
    await updatePreferencesMutation.mutateAsync(changedData);
  };

  return (
    <Form<FormData>
      {...props}
      ref={formRef}
      defaultValues={{
        timeZone: user?.timeZone || ''
      }}
      onSubmit={handleSubmit}
    >
      {children}
    </Form>
  );
};
