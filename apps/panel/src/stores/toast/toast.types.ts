import type { ToastVariant } from '@/components/ui';

export interface ToastAction {
  /**
   * The label for the action button
   */
  label: string;

  /**
   * The callback when the action is triggered
   */
  onClick: () => void;
}

export interface Toast {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * The title of the toast
   */
  title: string;

  /**
   * Optional description text
   */
  description?: string;

  /**
   * The visual variant of the toast
   */
  variant: ToastVariant;

  /**
   * Optional action button
   */
  action?: ToastAction;

  /**
   * Custom duration for this specific toast
   */
  duration?: number;
}

export interface ToastState {
  /**
   * Currently visible toasts
   */
  toasts: Toast[];

  /**
   * Add a new toast and return its ID
   */
  addToast: (toast: Omit<Toast, 'id'>) => string;

  /**
   * Remove a specific toast by ID
   */
  removeToast: (id: string) => void;

  /**
   * Remove all toasts
   */
  removeAllToasts: () => void;
}
