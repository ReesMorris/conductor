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
   * The icon to display in the toast
   */
  icon?: React.ReactNode;

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
}

export interface UseToastReturn {
  /**
   * Show a new toast
   */
  toast: (props: Omit<Toast, 'id'>) => string;

  /**
   * Show a neutral toast (no state color)
   */
  neutral: (title: string, description?: string) => string;

  /**
   * Show a success toast
   */
  success: (title: string, description?: string) => string;

  /**
   * Show an error toast
   */
  error: (title: string, description?: string) => string;

  /**
   * Show a warning toast
   */
  warning: (title: string, description?: string) => string;

  /**
   * Show an info toast
   */
  info: (title: string, description?: string) => string;

  /**
   * Dismiss a specific toast
   */
  dismiss: (id: string) => void;

  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;

  /**
   * Current toasts
   */
  toasts: Toast[];
}
