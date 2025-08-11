'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { XIcon } from 'lucide-react';
import { Dialog } from '../../dialog';
import { IconButton } from '../../icon-button';
import { ProgressIndicator } from '../../progress-indicator';
import {
  type MultiStepModalContextValue,
  MultiStepModalProvider,
  useMultiStepState
} from '../multi-step-modal-context';
import { NavigationButtons } from '../navigation-buttons';
import { styles } from './multi-step-modal-root.styles';
import type { MultiStepModalRootProps } from './multi-step-modal-root.types';

export const MultiStepModalRoot: React.FC<MultiStepModalRootProps> = ({
  onComplete,
  children,
  onOpenChange,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();
  const stepState = useMultiStepState(children, onComplete, onOpenChange);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset the multi-step state when closing
      stepState.reset();
    }
    onOpenChange?.(open);
  };

  const contextValue: MultiStepModalContextValue = {
    currentStep: stepState.currentStep,
    totalSteps: stepState.totalSteps,
    steps: stepState.steps,
    next: stepState.next,
    previous: stepState.previous,
    goToStep: stepState.goToStep,
    canProceed: stepState.canProceed,
    setCanProceed: stepState.setCanProceed,
    stepData: stepState.stepData,
    setStepData: stepState.setStepData,
    complete: stepState.complete
  };

  const title = stepState.steps[stepState.currentStep]?.title;
  const description = stepState.steps[stepState.currentStep]?.description;

  return (
    <Dialog.Root {...props} onOpenChange={handleOpenChange}>
      <Dialog.Content size='lg'>
        <Dialog.Header>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}
        </Dialog.Header>

        <MultiStepModalProvider value={contextValue}>
          <div>{stepState.currentStepElement}</div>

          <NavigationButtons
            isFirstStep={stepState.isFirstStep}
            isLastStep={stepState.isLastStep}
            canProceed={stepState.canProceed}
            previous={stepState.previous}
            next={stepState.next}
            complete={stepState.complete}
            nextButtonLabel={
              stepState.steps[stepState.currentStep]?.nextButtonLabel
            }
            completeButtonLabel={
              stepState.steps[stepState.currentStep]?.completeButtonLabel
            }
          />

          <ProgressIndicator
            steps={stepState.steps}
            currentStep={stepState.currentStep}
          />
        </MultiStepModalProvider>

        <Dialog.Cancel asChild>
          <IconButton
            variant='ghost'
            size='sm'
            aria-label={formatMessage('Close')}
            className={styles.closeButton}
          >
            <XIcon />
          </IconButton>
        </Dialog.Cancel>
      </Dialog.Content>
    </Dialog.Root>
  );
};
