'use client';

import { Button, Field, Form, Input, PasswordInput } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  type RegisterFormData,
  registerFormSchema
} from './register-form.schema';

export const RegisterForm: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(
      registerFormSchema({
        emailRequired: formatMessage('Email is required'),
        invalidEmail: formatMessage('Invalid email address'),
        nameRequired: formatMessage('Name is required'),
        passwordRequired: formatMessage('Password is required')
      })
    )
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const { error } = await auth.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (error) {
        const errorMessage = getAuthErrorMessage(formatMessage, error.code);
        setAuthError(errorMessage);
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
    <Form onSubmit={handleSubmit(onSubmit)} errorMessage={authError}>
      <Field
        label={formatMessage('Your Name')}
        errorMessage={errors.name?.message}
      >
        <Input
          {...register('name')}
          placeholder={formatMessage('Alex Smith')}
          autoComplete='name'
        />
      </Field>

      <Field
        label={formatMessage('Email Address')}
        errorMessage={errors.email?.message}
      >
        <Input
          {...register('email')}
          placeholder={formatMessage('alex.smith@example.com')}
          autoComplete='email'
        />
      </Field>

      <Field
        label={formatMessage('Password')}
        errorMessage={errors.password?.message}
      >
        <PasswordInput {...register('password')} autoComplete='new-password' />
      </Field>

      <Button type='submit' isLoading={isSubmitting}>
        {formatMessage('Create Account')}
      </Button>
    </Form>
  );
};
