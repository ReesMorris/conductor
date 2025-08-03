import type { Auth } from 'better-auth';
import type { FormatMessageFunction } from '../format-message';

/**
 * Maps Better Auth error codes to i18n translation keys
 * This centralizes auth error handling for login, registration, and other auth flows
 */
export const getAuthErrorMessage = (
  formatMessage: FormatMessageFunction,
  errorCode?: string
): string => {
  if (!errorCode) {
    return formatMessage('An unexpected error occurred');
  }

  const errorMap: Record<keyof Auth['$ERROR_CODES'], string> = {
    ACCOUNT_NOT_FOUND: formatMessage('Account not found'),
    CREDENTIAL_ACCOUNT_NOT_FOUND: formatMessage('Account not found'),
    EMAIL_CAN_NOT_BE_UPDATED: formatMessage('Email cannot be updated'),
    EMAIL_NOT_VERIFIED: formatMessage('Email not verified'),
    FAILED_TO_CREATE_SESSION: formatMessage('Failed to create session'),
    FAILED_TO_CREATE_USER: formatMessage('Failed to create user'),
    FAILED_TO_GET_SESSION: formatMessage('Failed to get session'),
    FAILED_TO_GET_USER_INFO: formatMessage('Failed to get user info'),
    FAILED_TO_UNLINK_LAST_ACCOUNT: formatMessage(
      'Failed to unlink last account'
    ),
    FAILED_TO_UPDATE_USER: formatMessage('Failed to update user'),
    ID_TOKEN_NOT_SUPPORTED: formatMessage('ID token not supported'),
    INVALID_EMAIL: formatMessage('Invalid email address'),
    INVALID_EMAIL_OR_PASSWORD: formatMessage('Invalid email or password'),
    INVALID_PASSWORD: formatMessage('Invalid password'),
    INVALID_TOKEN: formatMessage('Invalid token'),
    PASSWORD_TOO_LONG: formatMessage('Password is too long'),
    PASSWORD_TOO_SHORT: formatMessage('Password is too short'),
    PROVIDER_NOT_FOUND: formatMessage('Provider not found'),
    SESSION_EXPIRED: formatMessage('Session expired'),
    SOCIAL_ACCOUNT_ALREADY_LINKED: formatMessage(
      'Social account already linked'
    ),
    USER_ALREADY_EXISTS: formatMessage('User already exists'),
    USER_ALREADY_HAS_PASSWORD: formatMessage('User already has a password'),
    USER_EMAIL_NOT_FOUND: formatMessage('User email not found'),
    USER_NOT_FOUND: formatMessage('User not found')
  };

  return (
    errorMap[errorCode as keyof Auth['$ERROR_CODES']] ||
    formatMessage('An unexpected error occurred')
  );
};
