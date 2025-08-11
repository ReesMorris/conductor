import type { User } from '@conductor/auth';

export interface SidebarItemProps {
  /**
   * The URL to navigate to when the item is clicked.
   */
  href?: string;

  /**
   * The icon to display next to the label.
   */
  icon?: React.ReactNode;

  /**
   * The label text for the navigation item.
   */
  label?: string;

  /**
   * The required user role to display this item.
   */
  userRole?: User['role'];

  /**
   * Whether to use exact path matching for highlighting.
   * @default true
   */
  exact?: boolean;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;
}
