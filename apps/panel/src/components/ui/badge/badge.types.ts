import type { styles } from './badge.styles';

export type BadgeColor = (typeof styles.badge.variantMap.color)[number];

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The color variant of the badge.
   * @default 'green'
   */
  color?: BadgeColor;
}
