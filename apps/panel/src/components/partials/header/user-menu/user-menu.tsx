'use client';

import { DropdownMenu } from '@/components/ui';
import { Avatar } from '@/components/ui/avatar/avatar';
import { useAuth, useSession, useTheme } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { LogOutIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { styles } from './user-menu.styles';

export const UserMenu = () => {
  const t = useTranslations('user_menu');
  const auth = useAuth();
  const { data: session } = useSession();
  const { toggleTheme, theme } = useTheme();
  const locale = useLocale();
  const router = useRouter();

  // If no session, don't render the menu
  if (!session) {
    return null;
  }

  // Handle theme toggle
  const handleThemeChange = (event: Event) => {
    event.preventDefault(); // don't close the dropdown
    toggleTheme();
  };

  // Handle logout
  const handleLogout = () => {
    auth.signOut();
    router.push(route('LOGIN'));
  };

  return (
    <DropdownMenu.Root
      trigger={<Avatar src={session.user.image} />}
      align='end'
      sideOffset={8}
      className={styles.menu}
    >
      <div className={styles.accountHeader}>
        <div className={styles.username}>{session.user.name}</div>
        <div className={styles.email}>{session.user.email}</div>
      </div>

      <DropdownMenu.Item href={route('ACCOUNT')}>
        {t('account_settings')}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onSelect={handleThemeChange}
        icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      >
        {t('toggle_theme')}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        disabled
        icon={<div className={styles.locale}>{locale}</div>}
      >
        {t('change_language')}
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      {session.user.role === 'admin' && (
        <>
          <DropdownMenu.Item>{t('admin_panel')}</DropdownMenu.Item>
          <DropdownMenu.Separator />
        </>
      )}
      <DropdownMenu.Item onSelect={handleLogout} icon={<LogOutIcon />}>
        {t('logout')}
      </DropdownMenu.Item>
    </DropdownMenu.Root>
  );
};
