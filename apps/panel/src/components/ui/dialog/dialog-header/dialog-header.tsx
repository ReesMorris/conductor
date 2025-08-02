import { cx } from '@/styled-system/css';
import { styles } from './dialog-header.styles';
import type { DialogHeaderProps } from './dialog-header.types';

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  className
}) => {
  return <div className={cx(styles.header, className)}>{children}</div>;
};
