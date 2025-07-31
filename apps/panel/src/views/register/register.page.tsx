import { AuthLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { route } from '@/utils/route';
import { useTranslations } from 'next-intl';
import { RegisterForm } from './register-form';

export const Page = () => {
  const t = useTranslations('register_page');

  return (
    <AuthLayout
      title={t('form.title')}
      subtitle={t('form.subtitle')}
      footer={t.rich('form.login_link', {
        link: text => <Link href={route('LOGIN')}>{text}</Link>
      })}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
