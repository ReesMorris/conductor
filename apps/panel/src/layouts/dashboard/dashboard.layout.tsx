import { Header, Navigation, Wrapper } from '@/components/partials';
import { useFormatMessage } from '@/i18n/format-message';
import { route } from '@/utils/route';
import { ServerIcon, SettingsIcon } from 'lucide-react';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { formatMessage } = useFormatMessage();

  return (
    <>
      <Header />
      <Navigation.Root>
        <Navigation.Item
          icon={<ServerIcon />}
          href={route('SERVERS')}
          label={formatMessage('Servers')}
        />
        <Navigation.Item
          icon={<SettingsIcon />}
          href={route('USER_PROFILE_SETTINGS')}
          label={formatMessage('Settings')}
        />
      </Navigation.Root>
      <Wrapper>{children}</Wrapper>
    </>
  );
};
