'use client';

import type { ThemeName } from '@/constants';
import { useTheme as hook } from 'next-themes';
import type { UseTheme } from './use-theme.types';

export const useTheme = (): UseTheme => {
  const data = hook();

  /**
   * Sets the theme to the specified theme name.
   * @param themeName - The name of the theme to set, either 'light' or 'dark'.
   */
  const setTheme = (themeName: ThemeName) => {
    data.setTheme(themeName);
  };

  /**
   * The current theme name, which can be 'light', 'dark', or undefined if not set.
   */
  const theme = data.theme as ThemeName | undefined;

  return { setTheme, theme };
};
