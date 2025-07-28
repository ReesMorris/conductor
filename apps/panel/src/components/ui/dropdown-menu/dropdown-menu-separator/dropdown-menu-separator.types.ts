import type { DropdownMenu as RadixDropdownMenu } from 'radix-ui';

export interface DropdownMenuSeparatorProps
  extends RadixDropdownMenu.DropdownMenuSeparatorProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}
