'use client';

import { useToastStore } from '@/stores/toast';
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonAlertIcon,
  TriangleAlertIcon
} from 'lucide-react';
import { useCallback } from 'react';
import type { Toast, UseToastReturn } from './use-toast.types';

/**
 * Hook for managing toast notifications
 *
 * @returns An object containing methods to show, dismiss toasts and access current toasts
 */
export const useToast = (): UseToastReturn => {
  const { toasts, addToast, removeToast, removeAllToasts } = useToastStore();

  /**
   * Show a custom toast notification
   *
   * @param props - Toast configuration without ID (auto-generated)
   * @returns The ID of the created toast
   */
  const toast = useCallback(
    (props: Omit<Toast, 'id'>) => {
      return addToast(props);
    },
    [addToast]
  );

  /**
   * Dismiss a specific toast by ID
   *
   * @param id - The ID of the toast to dismiss
   */
  const dismiss = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast]
  );

  /**
   * Dismiss all active toasts at once
   */
  const dismissAll = useCallback(() => {
    removeAllToasts();
  }, [removeAllToasts]);

  /**
   * Show a success toast notification
   *
   * @param title - The main message to display
   * @param description - Optional additional details
   * @returns The ID of the created toast
   */
  const success = useCallback(
    (title: string, description?: string) =>
      toast({
        title,
        description,
        variant: 'success',
        icon: <CircleCheckIcon />
      }),
    [toast]
  );

  /**
   * Show an error toast notification
   *
   * @param title - The error message to display
   * @param description - Optional error details or instructions
   * @returns The ID of the created toast
   */
  const error = useCallback(
    (title: string, description?: string) =>
      toast({
        title,
        description,
        variant: 'error',
        icon: <OctagonAlertIcon />
      }),
    [toast]
  );

  /**
   * Show a warning toast notification
   *
   * @param title - The warning message to display
   * @param description - Optional warning details
   * @returns The ID of the created toast
   */
  const warning = useCallback(
    (title: string, description?: string) =>
      toast({
        title,
        description,
        variant: 'warning',
        icon: <TriangleAlertIcon />
      }),
    [toast]
  );

  /**
   * Show an informational toast notification
   *
   * @param title - The information to display
   * @param description - Optional additional information
   * @returns The ID of the created toast
   */
  const info = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, variant: 'info', icon: <InfoIcon /> }),
    [toast]
  );

  /**
   * Show a neutral toast notification (no specific variant)
   *
   * @param title - The message to display
   * @param description - Optional additional details
   * @returns The ID of the created toast
   */
  const neutral = useCallback(
    (title: string, description?: string) =>
      toast({
        title,
        description,
        variant: 'default',
        icon: null
      }),
    [toast]
  );

  return {
    toast,
    neutral,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
    toasts
  };
};
