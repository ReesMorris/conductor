import { AuthLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { route } from '@/utils/route';
import { useTranslations } from 'next-intl';
import { LoginForm } from './login-form';

export const Page = () => {
  const t = useTranslations('login_page');

  return (
    <AuthLayout
      title={t('form.title')}
      subtitle={t('form.subtitle')}
      footer={<Link href={route('REGISTER')}>{t('form.register_link')}</Link>}
    >
      <LoginForm />
    </AuthLayout>
  );
};
