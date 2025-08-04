'use client';

import type { FormRef, HandleSubmit } from '@/components/ui';
import { Form } from '@/components/ui';
import { useAuth, useToast, useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { useUserStore } from '@/stores';
import { useRef } from 'react';
import type { EmailSettingsFormProps } from './email-settings-form.types';

export interface FormData {
  email: string;
}

export const EmailSettingsForm: React.FC<EmailSettingsFormProps> = ({
  children,
  ...props
}) => {
  const formRef = useRef<FormRef<FormData>>(null);
  const toast = useToast();
  const { user } = useUser();
  const authClient = useAuth();
  const { formatMessage } = useFormatMessage();
  const updateUser = useUserStore(state => state.updateUser);

  const handleSubmit: HandleSubmit<FormData> = async ({ changedData }) => {
    try {
      await authClient.changeEmail({
        newEmail: changedData.email ?? ''
      });

      // Update the user store with new email
      updateUser({ email: changedData.email });

      // Tell the user about the successful update
      toast.success(formatMessage('Email updated successfully'));

      // Reset form to reflect the new email
      formRef.current?.reset({
        email: changedData.email || ''
      });
    } catch (error) {
      toast.error(
        formatMessage('Failed to update email'),
        error instanceof Error ? error.message : undefined
      );
    }
  };

  return (
    <Form<FormData>
      {...props}
      ref={formRef}
      defaultValues={{
        email: user?.email || ''
      }}
      onSubmit={handleSubmit}
    >
      {children}
    </Form>
  );
};
