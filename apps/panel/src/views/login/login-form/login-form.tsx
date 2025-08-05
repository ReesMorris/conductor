'use client';

import { Button, Form, type HandleSubmit } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { EmailField } from './email-field';
import { type LoginFormData, loginFormSchema } from './login-form.schema';
import { styles } from './login-form.styles';
import { PasswordField } from './password-field';

export const LoginForm: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit: HandleSubmit<LoginFormData> = async ({ data }) => {
    try {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      setAuthError(null);

      const { error } = await auth.signIn.email({
        email: data.email,
        password: data.password
      });

      if (error) {
        const errorMessage = getAuthErrorMessage(formatMessage, error.code);
        setAuthError(formatMessage(errorMessage));
        setIsSubmitting(false);
      } else {
        router.push(route('HOME'));
      }
    } catch {
      setAuthError(formatMessage('An unexpected error occurred'));
      setIsSubmitting(false);
    }
  };

  return (
    <Form<LoginFormData>
      onSubmit={handleSubmit}
      errorMessage={authError}
      className={styles.form}
      resolver={zodResolver(
        loginFormSchema({
          emailRequired: formatMessage('Email is required'),
          invalidEmail: formatMessage('Invalid email address'),
          passwordRequired: formatMessage('Password is required')
        })
      )}
    >
      <EmailField />
      <PasswordField />
      <Button type='submit' isLoading={isSubmitting}>
        {formatMessage('Sign In')}
      </Button>
    </Form>
  );
};
