import { AuthLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { formatMessageServer } from '@/i18n/format-message-server';
import { page } from '@/libs/page';
import { route } from '@/utils/route';
import { pageSchema } from './login.schema';
import { LoginForm } from './login-form';

export const Page = page(pageSchema, async () => {
  return (
    <AuthLayout
      title={
        await formatMessageServer('Welcome to {appName}', { appName: APP_NAME })
      }
      subtitle={await formatMessageServer('Sign in to your account')}
      footer={
        await formatMessageServer(
          "Don't have an account? <link>Create an account</link>",
          { link: text => <Link href={route('REGISTER')}>{text}</Link> }
        )
      }
    >
      <LoginForm />
    </AuthLayout>
  );
});
