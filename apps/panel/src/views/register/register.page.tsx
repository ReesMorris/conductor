import { AuthLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { formatMessageServer } from '@/i18n/format-message-server';
import { page } from '@/libs/page';
import { route } from '@/utils/route';
import { pageSchema } from './register.schema';
import { RegisterForm } from './register-form';

export const Page = page(pageSchema, async () => {
  return (
    <AuthLayout
      title={await formatMessageServer('Create an Account')}
      subtitle={await formatMessageServer('Create your account to get started')}
      footer={
        await formatMessageServer(
          'Already have an account? <link>Log in</link>',
          {
            link: text => <Link href={route('LOGIN')}>{text}</Link>
          }
        )
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
});
