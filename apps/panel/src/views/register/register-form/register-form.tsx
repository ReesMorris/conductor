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
import { NameField } from './name-field';
import { PasswordField } from './password-field';
import {
  type RegisterFormData,
  registerFormSchema
} from './register-form.schema';
import { styles } from './register-form.styles';

export const RegisterForm: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit: HandleSubmit<RegisterFormData> = async ({ data }) => {
    try {
      setAuthError(null);

      const { error } = await auth.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (error) {
        const errorMessage = getAuthErrorMessage(formatMessage, error.code);
        setAuthError(errorMessage);
      } else {
        router.push(route('HOME'));
      }
    } catch {
      setAuthError(formatMessage('An unexpected error occurred'));
    }
  };

  return (
    <Form<RegisterFormData>
      onSubmit={handleSubmit}
      errorMessage={authError}
      className={styles.form}
      resolver={zodResolver(
        registerFormSchema({
          emailRequired: formatMessage('Email is required'),
          invalidEmail: formatMessage('Invalid email address'),
          nameRequired: formatMessage('Name is required'),
          passwordRequired: formatMessage('Password is required')
        })
      )}
    >
      {({ formState }) => (
        <>
          <NameField />
          <EmailField />
          <PasswordField />
          <Button type='submit' isLoading={formState.isSubmitting}>
            {formatMessage('Create Account')}
          </Button>
        </>
      )}
    </Form>
  );
};
