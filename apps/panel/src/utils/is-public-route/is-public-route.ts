import { LOCALES, PUBLIC_ROUTES } from '@/constants';

/**
 * Check if a pathname is a public route
 * Handles locale prefixes (e.g., /en/login, /fr/login)
 */
export const isPublicRoute = (pathname: string): boolean => {
  let normalizedPath = pathname;
  for (const locale of LOCALES) {
    if (normalizedPath.startsWith(`/${locale}`)) {
      normalizedPath = normalizedPath.replace(`/${locale}`, '');
      break;
    }
  }
  return PUBLIC_ROUTES.has(normalizedPath);
};
