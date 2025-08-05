export interface ResetPasswordFormProps {
  /**
   * The reset token from the URL query parameters.
   */
  token: string;

  /**
   * The error code from the URL query parameters.
   */
  error?: 'invalid_token';
}
