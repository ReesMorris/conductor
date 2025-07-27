import type { styles } from './alert.styles';

export type AlertVariant = (typeof styles.alert.variantMap.variant)[number];
export type AlertColor = (typeof styles.alert.variantMap.color)[number];

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert.
   * @default 'outlined'
   */
  variant?: AlertVariant;

  /**
   * The color of the alert.
   * @default 'info'
   */
  color?: AlertColor;
}
