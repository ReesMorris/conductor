'use client';

import { cx } from '@/styled-system/css';
import { Heading } from '../heading';
import { styles } from './empty-state.styles';
import type { EmptyStateProps } from './empty-state.types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  indicator,
  title,
  description,
  actions,
  className,
  ...props
}) => {
  return (
    <div {...props} className={cx(styles.container, className)}>
      <div className={styles.content}>
        {indicator && <div className={styles.indicator}>{indicator}</div>}

        {title && (
          <Heading unstyled level={1} className={styles.title}>
            {title}
          </Heading>
        )}

        {description && <p className={styles.description}>{description}</p>}

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};
