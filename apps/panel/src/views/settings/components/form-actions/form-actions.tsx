'use client';

import { Button } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { styles } from './form-actions.styles';
import type { FormActionsProps } from './form-actions.types';

export const FormActions: React.FC<FormActionsProps> = ({
  isDirty,
  isSubmitting,
  onReset,
  cancelLabel,
  saveLabel
}) => {
  const { formatMessage } = useFormatMessage();

  return (
    <div className={styles.actions}>
      <Button
        type='reset'
        variant='outlined'
        size='sm'
        disabled={!isDirty || isSubmitting}
        onClick={onReset}
      >
        {cancelLabel || formatMessage('Cancel')}
      </Button>
      <Button
        type='submit'
        variant='primary'
        size='sm'
        disabled={!isDirty || isSubmitting}
        isLoading={isSubmitting}
      >
        {saveLabel || formatMessage('Save Changes')}
      </Button>
    </div>
  );
};
