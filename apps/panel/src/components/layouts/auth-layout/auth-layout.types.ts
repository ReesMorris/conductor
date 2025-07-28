export interface AuthLayoutProps {
  /**
   * The main title text to display in the authentication layout
   */
  title: string;

  /**
   * Optional subtitle text to display below the main title
   */
  subtitle?: string;

  /**
   * React children elements to render within the layout body
   */
  children: React.ReactNode;

  /**
   * Optional footer content to display at the bottom of the layout
   */
  footer?: React.ReactNode;
}
