'use client';

import type { FormRef, HandleSubmit } from '@/components/ui';
import { Form } from '@/components/ui';
import { useToast, useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { useUserStore } from '@/stores';
import { useRef } from 'react';
import type { PersonalInformationFormProps } from './personal-information-form.types';

export interface FormData {
  name: string;
}

export const PersonalInformationForm: React.FC<
  PersonalInformationFormProps
> = ({ children, ...props }) => {
  const formRef = useRef<FormRef<FormData>>(null);
  const toast = useToast();
  const { user } = useUser();
  const { formatMessage } = useFormatMessage();
  const updateUser = useUserStore(state => state.updateUser);

  const updatePreferencesMutation = trpc.profile.updateProfile.useMutation({
    onSuccess: updatedUser => {
      // Update the user store with new preferences
      updateUser(updatedUser);

      // Notify the user of the successful update
      toast.success(formatMessage('Profile updated successfully'));

      // Reset form with new default values to clear dirty state
      formRef.current?.reset({
        name: updatedUser.name || ''
      });
    },
    onError: error => {
      toast.error(formatMessage('Failed to update profile'), error.message);
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
        name: user?.name || ''
      }}
      onSubmit={handleSubmit}
    >
      {children}
    </Form>
  );
};
