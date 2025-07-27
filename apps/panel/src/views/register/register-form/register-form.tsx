'use client';

import { Button, Field, Form, Input } from '@/components/ui';
import { useAuth } from '@/hooks';
import { getAuthErrorKey } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  type RegisterFormData,
  registerFormSchema
} from './register-form.schema';

export const RegisterForm: React.FC = () => {
  const t = useTranslations('register_page.form');
  const tAuth = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
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
        const errorKey = getAuthErrorKey(error.code);
        setAuthError(tAuth(errorKey));
      } else {
        router.push(route('HOME'));
      }
    } catch {
      setAuthError(tAuth('auth.errors.generic'));
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} errorMessage={authError}>
      <Field label={t('name.label')} errorMessage={errors.name?.message}>
        <Input
          {...register('name')}
          placeholder={t('name.placeholder')}
          autoComplete='name'
        />
      </Field>

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
          autoComplete='new-password'
        />
      </Field>

      <Button type='submit' isLoading={isSubmitting}>
        {t('submit')}
      </Button>
    </Form>
  );
};
