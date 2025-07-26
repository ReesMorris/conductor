import type { styles } from './button.styles';

export type ButtonVariant = (typeof styles.button.variantMap.variant)[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button, which determines its style.
   * @default 'primary'
   */
  variant?: ButtonVariant;
}
