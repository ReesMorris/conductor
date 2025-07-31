import type { styles } from './button.styles';

export type ButtonVariant = (typeof styles.button.variantMap.variant)[number];
export type ButtonSize = (typeof styles.button.variantMap.size)[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * The variant of the button, which determines its style.
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean;

  /**
   * The class name of the button content
   */
  contentClassName?: string;
}
