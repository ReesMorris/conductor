export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Icon or image to display
   */
  indicator?: React.ReactNode;

  /**
   * Main title text
   */
  title?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Actions (buttons, links) to display below the content
   */
  actions?: React.ReactNode;
}
