import { cx } from '@/styled-system/css';
import { UserIcon } from 'lucide-react';
import { Avatar as RadixAvatar } from 'radix-ui';
import { styles } from './avatar.styles';
import type { AvatarProps } from './avatar.types';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size,
  shape,
  className,
  ...props
}) => {
  const classes = styles({ size, shape });

  return (
    <RadixAvatar.Root {...props} className={cx(classes.root, className)}>
      <RadixAvatar.Image
        src={src ?? undefined}
        alt={alt}
        className={classes.image}
      />
      <RadixAvatar.Fallback className={classes.fallback}>
        {fallback || <UserIcon />}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};
