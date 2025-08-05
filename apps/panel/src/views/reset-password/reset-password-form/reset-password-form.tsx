'use client';

import { AuthLayout } from '@/components/layouts';
import { Alert, Button, Form, type HandleSubmit, Link } from '@/components/ui';
import { useAuth, useToast } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { NewPasswordField } from './new-password-field';
import {
  type ResetPasswordFormData,
  resetPasswordFormSchema
} from './reset-password-form.schema';
import { styles } from './reset-password-form.styles';
import type { ResetPasswordFormProps } from './reset-password-form.types';

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  error
}) => {
  const { formatMessage } = useFormatMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit: HandleSubmit<ResetPasswordFormData> = async ({
    data
  }) => {
    try {
      // Don't proceed if there's no token, an error, or if already submitting
      if (!token || error || isSubmitting) {
        return;
      }

      // Set submitting state to true to prevent multiple submissions
      setIsSubmitting(true);

      // Attempt to reset the password
      const result = await auth.resetPassword({
        newPassword: data.newPassword,
        token
      });

      // If there's an error, show a toast notification
      if (result.error) {
        toast.error(
          formatMessage('Unable to reset password'),
          getAuthErrorMessage(formatMessage, result.error.code)
        );
        setIsSubmitting(false);
        return;
      }

      // If successful, notify the user and redirect
      toast.success(
        formatMessage('Password reset successfully'),
        formatMessage('You can now log in with your new password')
      );
      router.push(route('LOGIN'));
    } catch {
      toast.error(formatMessage('Something went wrong'));
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={formatMessage('Reset Password')}
      subtitle={formatMessage('Enter your new password')}
      footer={
        <Link href={route('LOGIN')} className={styles.backLink}>
          <ArrowLeftIcon />
          {formatMessage('Back to Login')}
        </Link>
      }
    >
      {error && (
        <Alert color='error' icon={<AlertCircleIcon />}>
          {formatMessage(
            'Invalid or expired token. Please <link>try again</link>.',
            {
              link: text => <Link href={route('FORGOT_PASSWORD')}>{text}</Link>
            }
          )}
        </Alert>
      )}

      {token && !error && (
        <Form<ResetPasswordFormData>
          onSubmit={handleSubmit}
          className={styles.form}
          resolver={zodResolver(
            resetPasswordFormSchema({
              passwordRequired: formatMessage('Password is required')
            })
          )}
        >
          <NewPasswordField />
          <Button type='submit' isLoading={isSubmitting}>
            {formatMessage('Reset Password')}
          </Button>
        </Form>
      )}
    </AuthLayout>
  );
};
