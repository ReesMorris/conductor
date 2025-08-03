import { AuthLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { route } from '@/utils/route';
import { RegisterForm } from './register-form';

export const Page = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <AuthLayout
      title={formatMessage('Create an Account')}
      subtitle={formatMessage('Create your account to get started')}
      footer={formatMessage('Already have an account? <link>Log in</link>', {
        link: text => <Link href={route('LOGIN')}>{text}</Link>
      })}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
