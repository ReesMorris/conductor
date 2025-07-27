'use client';

import { useField } from '@/hooks';
import { cx } from '@/styled-system/css';
import { styles } from './input.styles';
import type { InputProps } from './input.types';

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const fieldContext = useField();

  return (
    <input
      {...props}
      id={props.id || fieldContext?.controlId || undefined}
      aria-invalid={fieldContext?.isInvalid || undefined}
      aria-describedby={
        fieldContext?.errorId || fieldContext?.descriptionId || undefined
      }
      aria-required={fieldContext?.isRequired || undefined}
      disabled={props.disabled || fieldContext?.isDisabled || undefined}
      readOnly={props.readOnly || fieldContext?.isReadOnly || undefined}
      className={cx(styles.input, className)}
    />
  );
};
