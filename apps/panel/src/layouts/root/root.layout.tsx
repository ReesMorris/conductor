import 'server-only';

import { routing } from '@/i18n/routing';
import { AuthProvider, ThemeProvider } from '@/providers';
import { cx } from '@/styled-system/css';
import { geist, inter } from '@/theme/fonts';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import '@/theme/root.css';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const Layout = async ({ params, children }: LayoutProps) => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={cx(geist.variable, inter.variable)}
    >
      <body>
        <NextIntlClientProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
