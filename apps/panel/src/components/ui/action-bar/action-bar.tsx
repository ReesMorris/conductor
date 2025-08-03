'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '../button';
import { styles } from './action-bar.styles';
import type { ActionBarProps } from './action-bar.types';

export const ActionBar: React.FC<ActionBarProps> = ({
  open,
  onCancel,
  onSave,
  cancelLabel,
  saveLabel,
  isLoading = false,
  children
}) => {
  const t = useTranslations('ui');
  const [mounted, setMounted] = useState(false);
  const [dataState, setDataState] = useState<'open' | 'closed'>('closed');
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (open && !hasBeenOpened) {
        setHasBeenOpened(true);
      }
      setDataState(open ? 'open' : 'closed');
    }
  }, [open, mounted, hasBeenOpened]);

  // Don't render until it's been opened at least once
  if (!hasBeenOpened) {
    return null;
  }

  return (
    <div className={styles.container} data-state={dataState} inert={!open}>
      <div className={styles.content}>
        {children}
        <Button
          size='sm'
          variant='outlined'
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel || t('cancel')}
        </Button>
        <Button
          size='sm'
          variant='primary'
          onClick={onSave}
          isLoading={isLoading}
        >
          {saveLabel || t('save')}
        </Button>
      </div>
    </div>
  );
};
