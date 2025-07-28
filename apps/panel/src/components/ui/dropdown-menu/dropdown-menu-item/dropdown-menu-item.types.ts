import type { DropdownMenu as RadixDropdownMenu } from 'radix-ui';

export interface DropdownMenuItemProps
  extends RadixDropdownMenu.DropdownMenuItemProps {
  /**
   * The content of the menu item
   */
  children: React.ReactNode;

  /**
   * Optional icon to display at the start of the item
   */
  icon?: React.ReactNode;

  /**
   * Optional URL to navigate to when the item is clicked
   */
  href?: string;

  /**
   * Additional CSS class names
   */
  className?: string;
}
