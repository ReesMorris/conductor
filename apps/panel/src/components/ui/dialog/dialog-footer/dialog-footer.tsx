import { cx } from '@/styled-system/css';
import { styles } from './dialog-footer.styles';
import type { DialogFooterProps } from './dialog-footer.types';

export const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className
}) => {
  return <div className={cx(styles.footer, className)}>{children}</div>;
};
