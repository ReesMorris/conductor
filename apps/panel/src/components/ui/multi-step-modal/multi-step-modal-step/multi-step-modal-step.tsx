'use client';

import { useEffect } from 'react';
import { useMultiStepModal } from '../multi-step-modal-context';
import type { MultiStepModalStepProps } from './multi-step-modal-step.types';

export const MultiStepModalStep: React.FC<MultiStepModalStepProps> = ({
  children,
  canProceed = true
}) => {
  const { setCanProceed } = useMultiStepModal();

  // Update canProceed when prop changes
  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return <>{children}</>;
};
