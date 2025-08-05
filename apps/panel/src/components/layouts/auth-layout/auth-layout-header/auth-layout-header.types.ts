export interface AuthLayoutHeaderProps {
  /**
   * The main title text to display in the authentication layout header
   */
  title: string;

  /**
   * Optional subtitle text to display below the main title
   */
  subtitle?: string;

  /**
   * Optional flag to show or hide the logo in the header
   * @default true
   */
  showLogo?: boolean;

  /**
   * Optional icon to display instead of the logo
   */
  icon?: React.ReactNode;
}
