'use client';

import { Button, Dialog } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { styles } from './navigation-buttons.styles';
import type { NavigationButtonsProps } from './navigation-buttons.types';

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  isFirstStep,
  isLastStep,
  canProceed,
  previous,
  next,
  complete,
  nextButtonLabel,
  completeButtonLabel
}) => {
  const { formatMessage } = useFormatMessage();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await complete();
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Dialog.Footer>
      <div className={styles.container}>
        <Button variant='ghost' onClick={previous} disabled={isFirstStep}>
          <ArrowLeftIcon />
          {formatMessage('Back')}
        </Button>

        {isLastStep ? (
          <Button
            onClick={handleComplete}
            disabled={!canProceed || isFirstStep || isCompleting}
          >
            {completeButtonLabel || formatMessage('Complete')}
            <ArrowRightIcon />
          </Button>
        ) : (
          <Button onClick={next} disabled={!canProceed}>
            {nextButtonLabel || formatMessage('Next')}
            <ArrowRightIcon />
          </Button>
        )}
      </div>
    </Dialog.Footer>
  );
};
