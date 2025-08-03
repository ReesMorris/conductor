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
import { useFormatMessage } from '@/i18n/format-message';
import { getAuthErrorMessage } from '@/i18n/mappings';
import { useRouter } from '@/i18n/navigation';
import { VisuallyHidden } from '@/styled-system/jsx';
import { route } from '@/utils/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormData, loginFormSchema } from './login-form.schema';
import { styles } from './login-form.styles';

export const LoginForm: React.FC = () => {
  const { formatMessage } = useFormatMessage();
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
        emailRequired: formatMessage('Email is required'),
        invalidEmail: formatMessage('Invalid email address'),
        passwordRequired: formatMessage('Password is required')
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
    <Form onSubmit={handleSubmit(onSubmit)} errorMessage={authError}>
      <Field
        label={formatMessage('Email Address')}
        errorMessage={errors.email?.message}
      >
        <InputGroup startElement={<MailIcon />}>
          <Input
            {...register('email')}
            placeholder={formatMessage('alex.smith@example.com')}
            autoComplete='email'
          />
        </InputGroup>
      </Field>

      <Field
        label={formatMessage('Password')}
        labelSuffix={
          <Link href={route('FORGOT_PASSWORD')} className={styles.forgotLink}>
            {formatMessage('Forgot<hidden> password</hidden>?', {
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
        {formatMessage('Sign In')}
      </Button>
    </Form>
  );
};
