import { APP_NAME } from '@/constants';
import logo from '@/public/images/logo.webp';
import { cx } from '@/styled-system/css';
import Image from 'next/image';
import { styles } from './logo.styles';
import type { LogoProps } from './logo.types';

export const Logo: React.FC<LogoProps> = ({
  shape,
  size = 64,
  className,
  ...props
}) => {
  return (
    <Image
      src={logo}
      alt={APP_NAME}
      {...props}
      style={{ inlineSize: size, blockSize: size }}
      className={cx(styles.logo({ shape }), className)}
      draggable={false}
    />
  );
};
