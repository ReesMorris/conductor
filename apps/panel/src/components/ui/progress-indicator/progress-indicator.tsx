'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { VisuallyHidden } from '@/styled-system/jsx';
import { CheckIcon } from 'lucide-react';
import { Fragment, useEffect, useRef } from 'react';
import { styles } from './progress-indicator.styles';
import type {
  ProgressIndicatorProps,
  StepStatus
} from './progress-indicator.types';

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  ariaLabel,
  announceStepChange = true
}) => {
  const { formatMessage } = useFormatMessage();
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef(currentStep);

  // Anounce step changes for screen readers
  useEffect(() => {
    if (
      announceStepChange &&
      previousStepRef.current !== currentStep &&
      liveRegionRef.current
    ) {
      const currentStepData = steps[currentStep];
      if (currentStepData) {
        liveRegionRef.current.textContent = formatMessage(
          'Step {stepNumber} of {totalSteps}: {title}',
          {
            stepNumber: currentStep + 1,
            totalSteps: steps.length,
            title: currentStepData.title
          }
        );
      }
    }
    previousStepRef.current = currentStep;
  }, [currentStep, steps, announceStepChange, formatMessage]);

  // Determine the status of each step
  const getStepStatus = (index: number): StepStatus => {
    if (index === currentStep) {
      return 'current';
    } else if (index < currentStep) {
      return 'completed';
    } else {
      return 'pending';
    }
  };

  // Generate ARIA label for each step
  const getStepAriaLabel = (step: (typeof steps)[0], index: number) => {
    const status = getStepStatus(index);
    const position = formatMessage('Step {index} of {total}', {
      index: index + 1,
      total: steps.length
    });

    let statusText = formatMessage('Not started');
    if (status === 'current') {
      statusText = formatMessage('Current step');
    } else if (status === 'completed') {
      statusText = formatMessage('Completed');
    }

    return formatMessage(
      'Step {position}: {title}. {statusText}{description}',
      {
        position,
        title: step.title,
        statusText,
        description: step.description || ''
      }
    );
  };

  return (
    <>
      <nav
        aria-label={ariaLabel || formatMessage('Progress indicator')}
        className={styles.container}
      >
        <ol className={styles.list}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;
            const isLast = index === steps.length - 1;

            return (
              <Fragment key={step.title}>
                <li
                  className={styles.step}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={getStepAriaLabel(step, index)}
                >
                  <div
                    className={styles.indicator}
                    data-active={isActive || undefined}
                    data-complete={isCompleted || undefined}
                    data-incomplete={isPending || undefined}
                  >
                    <span aria-hidden='true'>
                      {isCompleted ? <CheckIcon /> : index + 1}
                    </span>
                  </div>
                </li>

                {!isLast && (
                  <li
                    className={styles.line}
                    data-complete={isCompleted || undefined}
                    aria-hidden='true'
                  />
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>

      <VisuallyHidden
        ref={liveRegionRef}
        aria-live='polite'
        aria-atomic='true'
      />
    </>
  );
};
