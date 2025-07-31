/**
 * Maps Better Auth error codes to i18n translation keys
 * This centralizes auth error handling for login, registration, and other auth flows
 */
// biome-ignore lint/suspicious/noExplicitAny: any is a workaround for next-intl's strict typing
const ERROR_MAP: Record<string, any> = {
  // Authentication errors
  INVALID_CREDENTIALS: 'errors.invalid_credentials',
  USER_NOT_FOUND: 'errors.user_not_found',
  INVALID_EMAIL_OR_PASSWORD: 'errors.invalid_email_or_password',

  // Account status errors
  ACCOUNT_LOCKED: 'errors.account_locked',
  ACCOUNT_NOT_VERIFIED: 'errors.account_not_verified',

  // Registration errors
  USER_ALREADY_EXISTS: 'errors.user_already_exists',
  INVALID_EMAIL: 'errors.invalid_email',
  PASSWORD_TOO_WEAK: 'errors.password_too_weak',

  // Session/token errors
  SESSION_EXPIRED: 'errors.session_expired',
  INVALID_TOKEN: 'errors.invalid_token',

  // Rate limiting
  TOO_MANY_ATTEMPTS: 'errors.too_many_attempts',

  // Network/server errors
  NETWORK_ERROR: 'errors.network_error',
  SERVER_ERROR: 'errors.server_error'
};

export const getAuthErrorKey = (errorCode?: string) => {
  if (!errorCode) {
    return 'errors.generic';
  }

  return ERROR_MAP[errorCode] || 'errors.generic';
};
