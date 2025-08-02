import { cx } from '@/styled-system/css';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { styles } from './icon-button.styles';
import type { IconButtonProps } from './icon-button.types';

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  className,
  ...props
}) => {
  return (
    <Tooltip
      triggerAsChild
      content={ariaLabel}
      disabled={props.isLoading || props.disabled} // don't show tooltip when loading or disabled
    >
      <Button {...props} className={cx(styles.iconButton, className)} />
    </Tooltip>
  );
};
