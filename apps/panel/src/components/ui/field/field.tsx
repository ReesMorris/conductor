'use client';

import { FieldContext } from '@/contexts';
import { cx } from '@/styled-system/css';
import { useId } from 'react';
import { Label } from '../label';
import { styles } from './field.styles';
import type { FieldProps } from './field.types';
import { generateIds } from './utils';

export const Field: React.FC<FieldProps> = ({
  label,
  labelSuffix,
  helpText,
  errorMessage,
  disabled,
  required,
  readonly,
  className,
  children
}) => {
  const id = useId();
  const { labelId, controlId, descriptionId, errorId } = generateIds(id);

  return (
    <FieldContext
      value={{
        controlId,
        labelId,
        descriptionId: helpText && !errorMessage ? descriptionId : undefined,
        errorId: errorMessage ? errorId : undefined,
        isInvalid: !!errorMessage,
        isDisabled: disabled,
        isRequired: required,
        isReadOnly: readonly
      }}
    >
      <div
        className={cx(styles.field, className)}
        data-disabled={disabled || undefined}
      >
        <div className={styles.labelContainer}>
          <Label id={labelId} htmlFor={controlId} disabled={disabled}>
            {label}
          </Label>
          {labelSuffix}
        </div>
        {children}

        <div
          className={styles.fieldDescription}
          data-disabled={disabled || undefined}
        >
          {helpText && !errorMessage && (
            <div id={descriptionId} className={styles.helpText}>
              {helpText}
            </div>
          )}
          {errorMessage && (
            <div id={errorId} className={styles.errorText}>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </FieldContext>
  );
};
