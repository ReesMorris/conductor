import type { styles } from './logo.styles';

export type LogoShape = (typeof styles.logo.variantMap.shape)[number];

export interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
  /**
   * The size of the logo in pixels.
   * @default 64
   */
  size?: number;

  /**
   * The shape of the logo.
   * @default 'circle'
   */
  shape?: LogoShape;
}
