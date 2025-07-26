import { env } from '@/env';
import { THEME_DATA_ATTRIBUTE } from '@/theme/theme.constants';
import { ThemeProvider as Provider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <Provider
      enableSystem
      disableTransitionOnChange
      attribute={THEME_DATA_ATTRIBUTE}
      defaultTheme={env.DEFAULT_THEME}
    >
      {children}
    </Provider>
  );
};
