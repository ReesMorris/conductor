export interface AuthWrapperProps {
  /**
   * The content to render once authentication is loaded
   */
  children: React.ReactNode;

  /**
   * The skeleton component to render while authentication is loading
   */
  skeleton: React.ReactNode;

  /**
   * Render the skeleton on top of the children in debug mode
   * @default false
   */
  debug?: boolean;
}
