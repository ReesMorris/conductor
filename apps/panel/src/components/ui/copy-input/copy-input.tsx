'use client';

import { useToast } from '@/hooks/toast';
import { useFormatMessage } from '@/i18n/format-message';
import { cx } from '@/styled-system/css';
import { CopyIcon } from 'lucide-react';
import { useCallback } from 'react';
import { styles } from './copy-input.styles';
import type { CopyInputProps } from './copy-input.types';

export const CopyInput: React.FC<CopyInputProps> = ({
  value,
  className,
  'aria-label': ariaLabel,
  onCopy
}) => {
  const toast = useToast();
  const { formatMessage } = useFormatMessage();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(formatMessage('Copied to clipboard'));
      onCopy?.(value);
    } catch {
      toast.error(formatMessage('Copy failed'));
    }
  }, [value, toast, formatMessage, onCopy]);

  return (
    <div className={cx(styles.container, className)}>
      <code className={styles.code}>{value}</code>
      <button
        type='button'
        className={styles.button}
        onClick={handleCopy}
        aria-label={ariaLabel}
      >
        <CopyIcon />
      </button>
    </div>
  );
};
