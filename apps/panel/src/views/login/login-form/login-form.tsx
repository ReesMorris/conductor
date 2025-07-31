'use client';

import { Button, Field, Form, Input, InputGroup, Link } from '@/components/ui';
import { useAuth } from '@/hooks';
import { getAuthErrorKey } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormData, loginFormSchema } from './login-form.schema';
import { styles } from './login-form.styles';

export const LoginForm: React.FC = () => {
  const t = useTranslations('login_page.form');
  const tAuth = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();

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
        const errorKey = getAuthErrorKey(error.code);
        setAuthError(tAuth(errorKey));
        setIsSubmitting(false);
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
      <Field label={t('email.label')} errorMessage={errors.email?.message}>
        <InputGroup iconStart={<MailIcon />}>
          <Input
            {...register('email')}
            placeholder={t('email.placeholder')}
            autoComplete='email'
          />
        </InputGroup>
      </Field>

      <Field
        label={t('password.label')}
        labelSuffix={
          <Link href={route('FORGOT_PASSWORD')} className={styles.forgotLink}>
            {t('forgot')}
          </Link>
        }
        errorMessage={errors.password?.message}
      >
        <InputGroup iconStart={<LockIcon />}>
          <Input
            {...register('password')}
            type='password'
            placeholder='••••••••••'
            autoComplete='current-password'
          />
        </InputGroup>
      </Field>

      <Button type='submit' isLoading={isSubmitting}>
        {t('submit')}
      </Button>
    </Form>
  );
};
