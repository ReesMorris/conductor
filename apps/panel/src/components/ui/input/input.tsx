'use client';

import { useField, useInputGroup } from '@/hooks';
import { styles } from './input.styles';
import type { InputProps } from './input.types';

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const fieldContext = useField();
  const inputGroupContext = useInputGroup();

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
      data-has-start-element={inputGroupContext?.hasElementStart || undefined}
      data-has-end-element={inputGroupContext?.hasElementEnd || undefined}
      className={styles.input}
    />
  );
};
