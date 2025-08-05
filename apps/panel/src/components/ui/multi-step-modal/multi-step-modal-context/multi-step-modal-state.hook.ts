'use client';

import { Children, useMemo, useState } from 'react';
import { isStepComponent } from '../utils';
import type { StepMetadata } from './multi-step-modal.types';

export const useMultiStepState = (
  children: React.ReactNode,
  onComplete?: () => void,
  onOpenChange?: (open: boolean) => void
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const [stepData, setStepDataState] = useState<Record<string, unknown>>({});

  // Extract step metadata from children
  const steps = useMemo(() => {
    return Children.toArray(children)
      .filter(isStepComponent)
      .map(
        (child, index): StepMetadata => ({
          title: child.props.title,
          description: child.props.description ?? '',
          index
        })
      );
  }, [children]);

  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  // Navigation functions
  const next = () => {
    if (currentStep < totalSteps - 1 && canProceed) {
      setCurrentStep(currentStep + 1);
      setCanProceed(true); // Reset for next step
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCanProceed(true); // Reset when going back
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < totalSteps) {
      setCurrentStep(index);
      setCanProceed(true);
    }
  };

  const complete = () => {
    onComplete?.();
    onOpenChange?.(false);

    // Reset state
    setCurrentStep(0);
    setStepDataState({});
    setCanProceed(true);
  };

  const setStepData = (data: Record<string, unknown>) => {
    setStepDataState(prev => ({ ...prev, ...data }));
  };

  // Get current step element
  const currentStepElement = Children.toArray(children)[currentStep];

  return {
    // State
    currentStep,
    totalSteps,
    steps,
    canProceed,
    stepData,

    // Actions
    next,
    previous,
    goToStep,
    setCanProceed,
    setStepData,
    complete,

    // Computed values
    isFirstStep,
    isLastStep,
    currentStepElement
  };
};
