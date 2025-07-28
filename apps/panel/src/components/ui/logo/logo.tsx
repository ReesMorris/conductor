import logoImage from '@/public/images/logo.webp';
import { cx } from '@/styled-system/css';
import Image from 'next/image';
import { styles } from './logo.styles';
import type { LogoProps } from './logo.types';

export const Logo: React.FC<LogoProps> = ({
  size = 64,
  className,
  ...props
}) => {
  return (
    <Image
      {...props}
      src={logoImage}
      alt='Conductor Logo'
      width={size}
      height={size}
      className={cx(styles.logo, className)}
      draggable={false}
    />
  );
};
