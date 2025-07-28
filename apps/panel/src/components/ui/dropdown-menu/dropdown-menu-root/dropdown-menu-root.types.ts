import type { DropdownMenu as RadixDropdownMenu } from 'radix-ui';

export interface DropdownMenuRootProps
  extends RadixDropdownMenu.DropdownMenuProps {
  /**
   * The element that triggers the dropdown menu
   */
  trigger: React.ReactNode;

  /**
   * Whether the trigger should use Radix UI's asChild pattern
   * @default false
   */
  triggerAsChild?: boolean;

  /**
   * The content of the dropdown menu (items)
   */
  children: React.ReactNode;

  /**
   * The preferred alignment of the dropdown relative to the trigger
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * The preferred side of the trigger to render the dropdown
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The distance in pixels from the trigger
   * @default 4
   */
  sideOffset?: number;

  /**
   * Additional CSS class names for the content
   */
  className?: string;
}
