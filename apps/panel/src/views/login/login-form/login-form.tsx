'use client';

import { Button, Field, Form, Input } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormData, loginFormSchema } from './login-form.schema';

export const LoginForm: React.FC = () => {
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
      <Field label='Email Address' errorMessage={errors.email?.message}>
        <Input
          {...register('email')}
          placeholder='steve@minecraft.com'
          autoComplete='email'
        />
      </Field>

      <Field label='Password' errorMessage={errors.password?.message}>
        <Input
          {...register('password')}
          type='password'
          placeholder='••••••••••'
          autoComplete='current-password'
        />
      </Field>

      <Button type='submit' isLoading={isSubmitting}>
        Sign In
      </Button>
    </Form>
  );
};
