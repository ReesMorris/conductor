import { APP_NAME } from '@/constants';
import { env } from '@/env';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import urlJoin from 'url-join';
import type { MetadataCallback } from './create-metadata.types';

export const createMetadata = (callback: MetadataCallback) => {
  return async (): Promise<Metadata> => {
    const t = await getTranslations();
    const metadata = callback(t as (key: string) => string);

    // Append site name to title if title exists
    if (metadata.title) {
      metadata.title = t('common.page_title', {
        title: metadata.title as string,
        appName: APP_NAME
      });
    } else {
      metadata.title = APP_NAME;
    }

    return {
      icons: '/images/logo.webp',
      alternates: {
        canonical: env.FRONTEND_URL,
        languages: routing.locales
          .filter(locale => locale !== routing.defaultLocale)
          .reduce(
            (acc, locale) => {
              acc[locale] = urlJoin(env.FRONTEND_URL, locale);
              return acc;
            },
            {} as Record<string, string>
          )
      },
      ...metadata
    };
  };
};
