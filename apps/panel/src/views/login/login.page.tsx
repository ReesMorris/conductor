import { AuthLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { useFormatMessage } from '@/i18n/format-message';
import { route } from '@/utils/route';
import { LoginForm } from './login-form';

export const Page = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <AuthLayout
      title={formatMessage('Welcome to {appName}', { appName: APP_NAME })}
      subtitle={formatMessage('Sign in to your account')}
      footer={formatMessage(
        "Don't have an account? <link>Create an account</link>",
        {
          link: text => <Link href={route('REGISTER')}>{text}</Link>
        }
      )}
    >
      <LoginForm />
    </AuthLayout>
  );
};
