import type { styles } from './alert.styles';

export type AlertColor = (typeof styles.variantMap.color)[number];

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the alert.
   */
  title?: string;

  /**
   * The content of the alert.
   */
  children?: React.ReactNode;

  /**
   * The color of the alert.
   * @default 'error'
   */
  color?: AlertColor;

  /**
   * The icon to display in the alert.
   */
  icon?: React.ReactNode;
}
