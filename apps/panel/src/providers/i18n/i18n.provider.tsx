import 'server-only';

import { env } from '@/env';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { I18nProviderProps } from './i18n.types';

export const I18nProvider: React.FC<I18nProviderProps> = async ({
  locale,
  children
}) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={env.TIMEZONE}
    >
      {children}
    </NextIntlClientProvider>
  );
};
