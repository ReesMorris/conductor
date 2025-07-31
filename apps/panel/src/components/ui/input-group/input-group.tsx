'use client';

import { InputGroupContext } from '@/contexts/input-group-context';
import { cx } from '@/styled-system/css';
import { useMemo } from 'react';
import { styles } from './input-group.styles';
import type { InputGroupProps } from './input-group.types';

export const InputGroup: React.FC<InputGroupProps> = ({
  startElement,
  endElement,
  children,
  className,
  ...props
}) => {
  const contextValue = useMemo(
    () => ({
      hasElementStart: !!startElement,
      hasElementEnd: !!endElement
    }),
    [startElement, endElement]
  );

  return (
    <InputGroupContext value={contextValue}>
      <div {...props} className={cx(styles.container, className)}>
        {startElement && (
          <div className={styles.icon} data-position='start'>
            {startElement}
          </div>
        )}
        {children}
        {endElement && (
          <div className={styles.icon} data-position='end'>
            {endElement}
          </div>
        )}
      </div>
    </InputGroupContext>
  );
};
