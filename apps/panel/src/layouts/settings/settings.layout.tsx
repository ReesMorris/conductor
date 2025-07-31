import { Main } from '@/components/partials';
import { Sidebar } from '@/components/partials/sidebar';
import { route } from '@/utils/route';
import { SettingsIcon, ShieldIcon, UserIcon, UsersIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const t = await getTranslations('settings.navigation');

  return (
    <>
      <Sidebar.Root>
        <Sidebar.Section title={t('personal')}>
          <Sidebar.Item
            href={route('USER_PROFILE_SETTINGS')}
            label={t('profile')}
            icon={<UserIcon />}
          />
          <Sidebar.Item
            href={route('USER_PREFERENCES_SETTINGS')}
            label={t('preferences')}
            icon={<SettingsIcon />}
          />
          <Sidebar.Item
            href={route('USER_SECURITY_SETTINGS')}
            label={t('security')}
            icon={<ShieldIcon />}
          />
        </Sidebar.Section>
        <Sidebar.Section title={t('workspace')}>
          <Sidebar.Item
            href={route('WORKSPACE_GENERAL_SETTINGS')}
            label={t('general_settings')}
            icon={<SettingsIcon />}
          />
          <Sidebar.Item
            href={route('WORKSPACE_USERS_SETTINGS')}
            label={t('users')}
            icon={<UsersIcon />}
          />
        </Sidebar.Section>
      </Sidebar.Root>

      <Main>{children}</Main>
    </>
  );
};
