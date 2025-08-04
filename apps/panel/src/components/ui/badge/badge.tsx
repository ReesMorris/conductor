import { cx } from '@/styled-system/css';
import { styles } from './badge.styles';
import type { BadgeProps } from './badge.types';

export const Badge: React.FC<BadgeProps> = ({
  color,
  children,
  className,
  ...props
}) => {
  return (
    <span {...props} className={cx(styles.badge({ color }), className)}>
      {children}
    </span>
  );
};
