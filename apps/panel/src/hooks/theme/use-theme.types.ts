import type { ThemeName } from '@/constants';

export interface UseTheme {
  /**
   * Sets the theme to the specified theme name.
   * @param themeName - The name of the theme to set, either 'light' or 'dark'.
   */
  setTheme: (themeName: ThemeName) => void;

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  toggleTheme: () => void;

  /**
   * The current theme name, which can be 'light', 'dark', or undefined if not set.
   */
  theme: ThemeName | undefined;
}
