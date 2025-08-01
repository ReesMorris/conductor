'use client';

import { LanguageSelector } from '@/components/features/language-selector';
import { DropdownMenu } from '@/components/ui';
import { useAuth, useSession, useTheme } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { route } from '@/utils/route';
import { GlobeIcon, LogOutIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { styles } from './user-menu.styles';
import { UserMenuTrigger } from './user-menu-trigger';

export const UserMenu = () => {
  const t = useTranslations('user_menu');
  const auth = useAuth();
  const { data: session } = useSession();
  const { toggleTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // If no session, don't render the menu
  if (!session) {
    // TODO: Return skeleton avatar here
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
      triggerAsChild
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <UserMenuTrigger
          isOpen={isOpen}
          profilePicture={session.user.image}
          name={session.user.name}
        />
      }
      align='end'
      sideOffset={8}
      className={styles.menu}
    >
      <div className={styles.accountHeader}>
        <div className={styles.username}>{session.user.name}</div>
        <div className={styles.email}>{session.user.email}</div>
      </div>

      <DropdownMenu.Separator />
      <DropdownMenu.Item disabled href={route('ACCOUNT')}>
        {t('account_settings')}
      </DropdownMenu.Item>
      <DropdownMenu.Item
        onSelect={handleThemeChange}
        icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      >
        {t('toggle_theme')}
      </DropdownMenu.Item>
      <LanguageSelector
        trigger={
          <DropdownMenu.Item
            onSelect={e => e.preventDefault()}
            icon={<GlobeIcon />}
          >
            {t('change_language')}
          </DropdownMenu.Item>
        }
      />
      <DropdownMenu.Separator />
      {session.user.role === 'admin' && (
        <>
          <DropdownMenu.Item href={route('WORKSPACE_GENERAL_SETTINGS')}>
            {t('workspace_settings')}
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
        </>
      )}
      <DropdownMenu.Item onSelect={handleLogout} icon={<LogOutIcon />}>
        {t('logout')}
      </DropdownMenu.Item>
    </DropdownMenu.Root>
  );
};
