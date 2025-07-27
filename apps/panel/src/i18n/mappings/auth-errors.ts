/**
 * Maps Better Auth error codes to i18n translation keys
 * This centralizes auth error handling for login, registration, and other auth flows
 */
// biome-ignore lint/suspicious/noExplicitAny: any is a workaround for next-intl's strict typing
const ERROR_MAP: Record<string, any> = {
  // Authentication errors
  INVALID_CREDENTIALS: 'auth.errors.invalid_credentials',
  USER_NOT_FOUND: 'auth.errors.user_not_found',
  INVALID_EMAIL_OR_PASSWORD: 'auth.errors.invalid_email_or_password',

  // Account status errors
  ACCOUNT_LOCKED: 'auth.errors.account_locked',
  ACCOUNT_NOT_VERIFIED: 'auth.errors.account_not_verified',

  // Registration errors
  USER_ALREADY_EXISTS: 'auth.errors.user_already_exists',
  INVALID_EMAIL: 'auth.errors.invalid_email',
  PASSWORD_TOO_WEAK: 'auth.errors.password_too_weak',

  // Session/token errors
  SESSION_EXPIRED: 'auth.errors.session_expired',
  INVALID_TOKEN: 'auth.errors.invalid_token',

  // Rate limiting
  TOO_MANY_ATTEMPTS: 'auth.errors.too_many_attempts',

  // Network/server errors
  NETWORK_ERROR: 'auth.errors.network_error',
  SERVER_ERROR: 'auth.errors.server_error'
};

export const getAuthErrorKey = (errorCode?: string) => {
  if (!errorCode) {
    return 'auth.errors.generic';
  }

  return ERROR_MAP[errorCode] || 'auth.errors.generic';
};
