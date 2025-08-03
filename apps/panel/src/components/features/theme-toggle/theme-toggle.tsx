'use client';

import { IconButton } from '@/components/ui';
import { useTheme } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { ThemeToggleProps } from './theme-toggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ ...props }) => {
  const { theme, toggleTheme } = useTheme();
  const { formatMessage } = useFormatMessage();
  const isDarkMode = theme === 'dark';

  return (
    <IconButton
      type='button'
      size='sm'
      variant='outlined'
      onClick={toggleTheme}
      aria-label={
        isDarkMode
          ? formatMessage('Change to light mode')
          : formatMessage('Change to dark mode')
      }
      {...props}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};
