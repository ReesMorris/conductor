import { routing } from '@/i18n/routing';
import type { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

/**
 * Middleware function for handling internationalization (i18n) in Next.js requests.
 *
 * This middleware applies internationalization routing to incoming requests by utilizing
 * the `createIntlMiddleware` function with the provided routing configuration.
 *
 * @param request - The incoming Next.js request object
 * @returns A `NextResponse` object with internationalization routing applied
 */
export const I18nMiddleware = (request: NextRequest): NextResponse => {
  return createIntlMiddleware(routing)(request);
};
