'use client';

import { AuthLayout } from '@/components/layouts';
import { Button, Form, type FormRef, type HandleSubmit } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { useAuth, useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { EmailField } from './email-field';
import { NameField } from './name-field';
import { PasswordField } from './password-field';
import { type UserSetupFormData, userSetupSchema } from './user-setup.schema';
import { styles } from './user-setup.styles';

export const UserSetup: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const formRef = useRef<FormRef<UserSetupFormData>>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const toast = useToast();

  const handleSubmit: HandleSubmit<UserSetupFormData> = async ({ data }) => {
    try {
      if (isSubmitting) {
        return;
      }

      // Prevent multiple submissions
      setIsSubmitting(true);

      // Attempt to sign up the user
      const { error } = await auth.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      });
      if (error) {
        // Show error toast if sign up fails
        toast.error(
          formatMessage('Failed to create account'),
          getAuthErrorMessage(formatMessage, error.code)
        );
        setIsSubmitting(false);
      } else {
        // Reload the page to move to the next step
        window.location.reload();
      }
    } catch {
      // Show error toast for unexpected errors
      toast.error(formatMessage('An unexpected error occurred'));
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <AuthLayout
      title={formatMessage('Welcome to {appName}', { appName: APP_NAME })}
      subtitle={formatMessage("Let's start by setting up your account!")}
    >
      <Form<UserSetupFormData>
        ref={formRef}
        mode='onSubmit'
        defaultValues={{
          name: '',
          email: '',
          password: ''
        }}
        resolver={zodResolver(
          userSetupSchema({
            emailRequired: formatMessage('Email is required'),
            invalidEmail: formatMessage('Invalid email address'),
            nameRequired: formatMessage('Name is required'),
            passwordRequired: formatMessage('Password is required')
          })
        )}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <NameField />
        <EmailField />
        <PasswordField />

        <Button
          type='submit'
          isLoading={isSubmitting}
          className={styles.submitButton}
        >
          {formatMessage('Continue Setup')}
          <ArrowRightIcon />
        </Button>
      </Form>
    </AuthLayout>
  );
};
