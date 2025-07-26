/** biome-ignore-all lint/a11y/noLabelWithoutControl: This component is a label and does not require a control. */

import { cx } from '@/styled-system/css';
import type { LabelProps } from './input.types';
import { styles } from './label.styles';

export const Label: React.FC<LabelProps> = ({
  disabled,
  className,
  ...props
}) => {
  return (
    <label
      {...props}
      className={cx(styles.label, className)}
      data-disabled={disabled || undefined}
    />
  );
};
