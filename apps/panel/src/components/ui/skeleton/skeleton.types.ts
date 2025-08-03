import type { styles } from './skeleton.styles';

export type SkeletonShape = (typeof styles.skeleton.variantMap.shape)[number];

export interface SkeletonProps {
  /**
   * Width of the skeleton element
   * Accepts any valid CSS width value (e.g., '100px', '50%', '10rem')
   * @default '100%'
   */
  width?: string;

  /**
   * Height of the skeleton element
   * Accepts any valid CSS height value (e.g., '20px', '2rem', '50%')
   * @default '1rem'
   */
  height?: string;

  /**
   * Shape of the skeleton element
   * Can be 'square', 'rounded', or 'circle'
   * @default 'rounded'
   */
  shape?: SkeletonShape;

  /**
   * Additional CSS class names to apply
   */
  className?: string;
}
