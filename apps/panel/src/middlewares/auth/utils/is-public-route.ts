import { DEFAULT_LOCALE, PUBLIC_ROUTES } from '@/constants';

/**
 * Check if a pathname is a public route
 * Handles locale prefixes (e.g., /en/login, /fr/login)
 */
export const isPublicRoute = (pathname: string): boolean => {
  const normalizedPath = pathname.replace(`/${DEFAULT_LOCALE}`, '');
  return PUBLIC_ROUTES.has(normalizedPath);
};
