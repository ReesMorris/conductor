'use client';

import { createContext, useContext } from 'react';

interface DialogContextValue {
  role: 'dialog' | 'alertdialog';
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const DialogProvider = DialogContext.Provider;

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within Dialog.Root');
  }
  return context;
};
