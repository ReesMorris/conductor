'use client';

import { useField } from '@/hooks';
import { ChevronDownIcon } from 'lucide-react';
import { styles } from './select.styles';
import type { SelectProps } from './select.types';

export const Select: React.FC<SelectProps> = ({
  className,
  children,
  ...props
}) => {
  const fieldContext = useField();

  return (
    <div className={styles.container}>
      <select
        {...props}
        id={props.id || fieldContext?.controlId || undefined}
        aria-invalid={fieldContext?.isInvalid || undefined}
        aria-describedby={
          fieldContext?.errorId || fieldContext?.descriptionId || undefined
        }
        aria-required={fieldContext?.isRequired || undefined}
        disabled={props.disabled || fieldContext?.isDisabled || undefined}
        className={styles.select}
      >
        {children}
      </select>
      <ChevronDownIcon className={styles.icon} />
    </div>
  );
};
