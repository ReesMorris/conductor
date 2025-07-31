import { Header, Main, Navigation, Wrapper } from '@/components/partials';
import { route } from '@/utils/route';
import { ServerIcon, SettingsIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const t = await getTranslations('dashboard.navigation');

  return (
    <>
      <Header />
      <Navigation.Root>
        <Navigation.Item
          icon={<ServerIcon />}
          href={route('SERVERS')}
          label={t('servers')}
        />
        <Navigation.Item
          icon={<SettingsIcon />}
          href={route('SERVER_SETTINGS')}
          label={t('settings')}
        />
      </Navigation.Root>
      <Main>
        <Wrapper>{children}</Wrapper>
      </Main>
    </>
  );
};
