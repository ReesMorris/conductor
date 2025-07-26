import 'server-only';

import { AuthProvider, ThemeProvider } from '@/providers';
import { cx } from '@/styled-system/css';
import { geist, inter } from '@/theme/fonts';
import '@/theme/root.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html
      suppressHydrationWarning
      lang='en'
      className={cx(geist.variable, inter.variable)}
    >
      <body>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
};
