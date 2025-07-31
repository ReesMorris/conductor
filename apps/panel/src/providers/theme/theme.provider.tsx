import 'server-only';

import { env } from '@/env';
import { ThemeProvider as Provider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <Provider
      enableSystem
      disableTransitionOnChange
      attribute='class'
      defaultTheme={env.DEFAULT_THEME}
    >
      {children}
    </Provider>
  );
};
