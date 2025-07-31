import { cx } from '@/styled-system/css';
import { styles } from './logo.styles';
import type { LogoProps } from './logo.types';

export const Logo: React.FC<LogoProps> = ({
  size = 64,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{ inlineSize: size, blockSize: size }}
      className={cx(styles.logo, className)}
      draggable={false}
    >
      C
    </div>
  );
};
