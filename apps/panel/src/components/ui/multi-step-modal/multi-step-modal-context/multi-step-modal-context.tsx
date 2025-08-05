'use client';

import { createContext, useContext } from 'react';
import type { MultiStepModalContextValue } from './multi-step-modal.types';

const MultiStepModalContext = createContext<MultiStepModalContextValue | null>(
  null
);

export const MultiStepModalProvider = MultiStepModalContext.Provider;

export const useMultiStepModal = () => {
  const context = useContext(MultiStepModalContext);
  if (!context) {
    throw new Error(
      'useMultiStepModal must be used within a MultiStepModal.Root'
    );
  }
  return context;
};
