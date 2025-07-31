'use client';

import { IconButton } from '@/components/ui';
import { useTheme } from '@/hooks';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ThemeToggleProps } from './theme-toggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ ...props }) => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('theme_toggle');
  const isDarkMode = theme === 'dark';

  return (
    <IconButton
      type='button'
      size='sm'
      variant='outlined'
      onClick={toggleTheme}
      aria-label={t('label', {
        theme: isDarkMode ? t('light') : t('dark')
      })}
      {...props}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};
