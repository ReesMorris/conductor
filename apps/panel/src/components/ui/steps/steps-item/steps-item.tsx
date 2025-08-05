import { cx } from '@/styled-system/css';
import { styles } from './steps-item.styles';
import type { StepsItemProps } from './steps-item.types';

export const StepsItem: React.FC<StepsItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li {...props} className={cx(styles.item, className)}>
      <div className={styles.indicatorWrapper}>
        <div className={styles.indicator} aria-hidden='true' />
        <div className={cx('step-line', styles.line)} aria-hidden='true' />
      </div>
      <div className={styles.content}>{children}</div>
    </li>
  );
};
