'use client';

import { InputGroupContext } from '@/contexts/input-group-context';
import { cx } from '@/styled-system/css';
import { useMemo } from 'react';
import { styles } from './input-group.styles';
import type { InputGroupProps } from './input-group.types';

export const InputGroup: React.FC<InputGroupProps> = ({
  iconStart,
  iconEnd,
  children,
  className,
  ...props
}) => {
  const contextValue = useMemo(
    () => ({
      hasIconStart: !!iconStart,
      hasIconEnd: !!iconEnd
    }),
    [iconStart, iconEnd]
  );

  return (
    <InputGroupContext value={contextValue}>
      <div {...props} className={cx(styles.container, className)}>
        {iconStart && (
          <div className={styles.icon} data-position='start'>
            {iconStart}
          </div>
        )}
        {children}
        {iconEnd && (
          <div className={styles.icon} data-position='end'>
            {iconEnd}
          </div>
        )}
      </div>
    </InputGroupContext>
  );
};
