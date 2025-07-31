import { cx } from '@/styled-system/css';
import { Button } from '../button';
import { styles } from './icon-button.styles';
import type { IconButtonProps } from './icon-button.types';

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={cx(styles.iconButton, className)}
      aria-label={ariaLabel}
    />
  );
};
