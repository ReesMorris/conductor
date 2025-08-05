import { Main } from '@/components/partials';
import { Sidebar } from '@/components/partials/sidebar';
import { useFormatMessage } from '@/i18n/format-message';
import { route } from '@/utils/route';
import {
  SettingsIcon,
  ShieldIcon,
  TrainFrontIcon,
  UserIcon,
  UsersIcon
} from 'lucide-react';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { formatMessage } = useFormatMessage();

  return (
    <>
      <Sidebar.Root>
        <Sidebar.Section title={formatMessage('Personal')}>
          <Sidebar.Item
            href={route('USER_PROFILE_SETTINGS')}
            label={formatMessage('Profile')}
            icon={<UserIcon />}
          />
          <Sidebar.Item
            href={route('USER_PREFERENCES_SETTINGS')}
            label={formatMessage('Preferences')}
            icon={<SettingsIcon />}
          />
          <Sidebar.Item
            href={route('USER_SECURITY_SETTINGS')}
            label={formatMessage('Security')}
            icon={<ShieldIcon />}
          />
        </Sidebar.Section>
        <Sidebar.Section title={formatMessage('Workspace')}>
          <Sidebar.Item
            href={route('WORKSPACE_GENERAL_SETTINGS')}
            label={formatMessage('General Settings')}
            icon={<SettingsIcon />}
          />
          <Sidebar.Item
            href={route('WORKSPACE_RAILWAY_SETTINGS')}
            label={formatMessage('Railway')}
            icon={<TrainFrontIcon />}
            userRole='admin'
          />
          <Sidebar.Item
            href={route('WORKSPACE_USERS_SETTINGS')}
            label={formatMessage('Users')}
            icon={<UsersIcon />}
          />
        </Sidebar.Section>
      </Sidebar.Root>

      <Main>{children}</Main>
    </>
  );
};
