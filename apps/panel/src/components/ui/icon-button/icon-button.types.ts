import type { ButtonProps } from '../button/button.types';

export interface IconButtonProps extends ButtonProps {
  /**
   * The label for the icon button, which is used for accessibility.
   */
  'aria-label': string;
}
