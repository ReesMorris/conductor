'use client';

import { AuthLayout, type AuthLayoutProps } from '@/components/layouts';
import { Alert, Button, Form, type HandleSubmit, Link } from '@/components/ui';
import { useAuth, useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { EmailField } from './email-field';
import {
  type ForgotPasswordFormData,
  forgotPasswordFormSchema
} from './forgot-password-form.schema';
import { styles } from './forgot-password-form.styles';
import type { ForgotPasswordFormProps } from './forgot-password-form.types';

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  redirectUrl
}) => {
  const { formatMessage } = useFormatMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const auth = useAuth();

  const handleSubmit: HandleSubmit<ForgotPasswordFormData> = async ({
    data
  }) => {
    try {
      // Don't proceed if already submitting
      if (isSubmitting) {
        return;
      }

      // Reset state before submission
      setIsSubmitting(true);

      // Attempt to send the password reset link
      const result = await auth.forgetPassword({
        email: data.email,
        redirectTo: redirectUrl
      });

      // If there's an error, show a toast notification
      if (result.error) {
        toast.error(
          formatMessage('Something went wrong'),
          getAuthErrorMessage(formatMessage, result.error.code)
        );
        return;
      }

      // If successful, notify the user
      setIsSuccess(true);
    } catch {
      toast.error(formatMessage('Something went wrong'));
    }
  };

  // Shared logic for success message
  const sharedLayoutProps: Partial<AuthLayoutProps> = {
    footer: (
      <Link href={route('LOGIN')} className={styles.backLink}>
        <ArrowLeftIcon />
        {formatMessage('Back to Login')}
      </Link>
    )
  };

  if (isSuccess) {
    return (
      <AuthLayout
        {...sharedLayoutProps}
        icon={<CheckCircleIcon />}
        title={formatMessage('Check your email')}
        subtitle={formatMessage('We have sent you a password reset link')}
      >
        <Alert color='warning'>
          Email delivery is not yet implemented. Please check the API service
          logs in Railway to retrieve your password reset link.
        </Alert>
      </AuthLayout>
    );
  } else {
    return (
      <AuthLayout
        {...sharedLayoutProps}
        title={formatMessage('Forgot Password')}
        subtitle={formatMessage('Request a password reset link')}
      >
        <Form<ForgotPasswordFormData>
          onSubmit={handleSubmit}
          className={styles.form}
          resolver={zodResolver(
            forgotPasswordFormSchema({
              invalid: formatMessage('Please enter a valid email address')
            })
          )}
        >
          <EmailField />
          <Button type='submit' isLoading={isSubmitting}>
            {formatMessage('Send Reset Link')}
          </Button>
        </Form>
      </AuthLayout>
    );
  }
};
