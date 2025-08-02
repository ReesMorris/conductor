'use client';

import { Toast } from 'radix-ui';
import type { ToastProviderProps } from './toast.types';
import { ToastViewport } from './toast-viewport';

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  duration = 5000,
  swipeDirection = 'right',
  swipeThreshold = 50
}) => {
  return (
    <Toast.Provider
      duration={duration}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
    >
      {children}
      <ToastViewport />
    </Toast.Provider>
  );
};
