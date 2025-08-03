import { cx } from '@/styled-system/css';
import { styles } from './skeleton.styles';
import type { SkeletonProps } from './skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = ({
  shape,
  width = '100%',
  height = '1rem',
  className
}) => {
  return (
    <div
      className={cx(styles.skeleton({ shape }), className)}
      style={{
        width,
        height
      }}
      aria-hidden='true'
    />
  );
};
