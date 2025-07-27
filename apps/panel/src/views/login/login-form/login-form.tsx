'use client';

import { Button, Field, Form, Input } from '@/components/ui';
import { useAuth } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormData, loginFormSchema } from './login-form.schema';

export const LoginForm: React.FC = () => {
  const t = useTranslations('login_page.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const { error } = await auth.signIn.email({
        email: data.email,
        password: data.password
      });

      if (error) {
        setAuthError(error.message || 'Invalid email or password');
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} errorMessage={authError}>
      <Field label={t('email.label')} errorMessage={errors.email?.message}>
        <Input
          {...register('email')}
          placeholder={t('email.placeholder')}
          autoComplete='email'
        />
      </Field>

      <Field
        label={t('password.label')}
        errorMessage={errors.password?.message}
      >
        <Input
          {...register('password')}
          type='password'
          placeholder='••••••••••'
          autoComplete='current-password'
        />
      </Field>

      <Button type='submit' isLoading={isSubmitting}>
        {t('submit')}
      </Button>
    </Form>
  );
};
