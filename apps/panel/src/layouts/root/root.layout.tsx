import 'server-only';

import { env } from '@/env';
import { routing } from '@/i18n/routing';
import { AuthProvider } from '@/providers/auth';
import { I18nProvider } from '@/providers/i18n';
import { ThemeProvider } from '@/providers/theme';
import { TrpcProvider } from '@/providers/trpc';
import { cx } from '@/styled-system/css';
import { geist, inter } from '@/theme/fonts';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import '@/theme/root.css';
import '@/theme/colors';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const generateStaticParams = () => {
  return routing.locales.map(locale => ({ locale }));
};

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
        <I18nProvider locale={locale}>
          <AuthProvider>
            <TrpcProvider apiUrl={env.API_URL}>
              <ThemeProvider>{children}</ThemeProvider>
            </TrpcProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
};
