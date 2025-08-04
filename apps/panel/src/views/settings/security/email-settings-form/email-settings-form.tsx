'use client';

import { Form, Heading } from '@/components/ui';
import { useAuth, useToast, useUser } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { useUserStore } from '@/stores';
import { getDirtyFields } from '@/utils/get-dirty-fields';
import { FormActions, SettingsGrid } from '@/views/settings/components';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EmailField } from './email-field';

const ID = 'email-settings';

interface EmailFormData {
  email: string;
}

export const EmailSettingsForm: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { user } = useUser();
  const toast = useToast();
  const authClient = useAuth();
  const updateUser = useUserStore(state => state.updateUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmailFormData>({
    mode: 'onChange',
    defaultValues: {
      email: user?.email || ''
    }
  });

  const { handleSubmit, formState, reset } = form;
  const { isDirty } = formState;

  const onSubmit = async (data: EmailFormData) => {
    // Get only changed fields
    const changedData = getDirtyFields(data, formState.dirtyFields);
    if (!changedData.email || changedData.email === user?.email) {
      return;
    }

    setIsSubmitting(true);
    try {
      await authClient.changeEmail({
        newEmail: changedData.email
      });

      // Update the user store with new email
      updateUser({ email: changedData.email });

      // Tell the user about the successful update
      toast.success(formatMessage('Email updated successfully'));

      // Reset form to reflect the new email
      reset(data);
    } catch (error) {
      toast.error(
        formatMessage('Failed to update email'),
        error instanceof Error ? error.message : undefined
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        {formatMessage('Email Settings')}
      </Heading>

      <FormProvider {...form}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          aria-busy={isSubmitting || undefined}
        >
          <SettingsGrid>
            <EmailField disabled={isSubmitting} />
          </SettingsGrid>

          <FormActions
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            onReset={() => reset({ email: user?.email || '' })}
          />
        </Form>
      </FormProvider>
    </section>
  );
};
