import type { styles } from './alert.styles';

export type AlertVariant = (typeof styles.alert.variantMap.variant)[number];

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert.
   * @default 'info'
   */
  variant?: AlertVariant;
}
