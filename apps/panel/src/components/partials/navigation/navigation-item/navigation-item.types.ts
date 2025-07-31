export interface NavigationItemProps {
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
  userRole?: string;
}
