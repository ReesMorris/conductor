import type { styles } from './button.styles';

export type ButtonVariant = (typeof styles.button.variantMap.variant)[number];
export type ButtonColor = (typeof styles.button.variantMap.color)[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button, which determines its style.
   * @default 'solid'
   */
  variant?: ButtonVariant;

  /**
   * The color scheme of the button.
   * @default 'primary'
   */
  color?: ButtonColor;

  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean;
}
