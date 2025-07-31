'use client';

import {
  Button,
  Field,
  Form,
  Input,
  InputGroup,
  Link,
  PasswordInput
} from '@/components/ui';
import { useAuth } from '@/hooks';
import { getAuthErrorKey } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { VisuallyHidden } from '@/styled-system/jsx';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormData, loginFormSchema } from './login-form.schema';
import { styles } from './login-form.styles';

export const LoginForm: React.FC = () => {
  const t = useTranslations('login_page.form');
  const tAuth = useTranslations('auth');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(
      loginFormSchema({
        emailRequired: tAuth('errors.email_required'),
        invalidEmail: tAuth('errors.invalid_email'),
        passwordRequired: tAuth('errors.password_required')
      })
    )
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
      setAuthError(tAuth('errors.generic'));
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} errorMessage={authError}>
      <Field label={t('email.label')} errorMessage={errors.email?.message}>
        <InputGroup startElement={<MailIcon />}>
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
            {t.rich('forgot', {
              hidden: text => <VisuallyHidden>{text}</VisuallyHidden>
            })}
          </Link>
        }
        errorMessage={errors.password?.message}
      >
        <PasswordInput
          {...register('password')}
          autoComplete='current-password'
        />
      </Field>

      <Button type='submit' isLoading={isSubmitting}>
        {t('submit')}
      </Button>
    </Form>
  );
};
