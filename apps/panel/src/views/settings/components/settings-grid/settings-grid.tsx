import { cx } from '@/styled-system/css';
import { styles } from './settings-grid.styles';
import type { SettingsGridProps } from './settings-grid.types';

export const SettingsGrid: React.FC<SettingsGridProps> = ({
  children,
  className
}) => {
  return <div className={cx(styles.grid, className)}>{children}</div>;
};
