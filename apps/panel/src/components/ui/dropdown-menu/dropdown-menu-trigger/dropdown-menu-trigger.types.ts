import type { ButtonProps } from '../../button/button.types';

export interface DropdownMenuTriggerProps extends ButtonProps {
  /**
   * Optional start element (icon or other component) to display before the text
   */
  startElement?: React.ReactNode;

  /**
   * Whether the dropdown menu is currently open
   */
  isOpen?: boolean;

  /**
   * Whether to show the chevron indicator
   * @default true
   */
  showChevron?: boolean;
}
