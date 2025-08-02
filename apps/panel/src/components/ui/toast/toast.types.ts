import type { Toast } from '@/hooks/toast';
import type { styles } from './toast.styles';

export type ToastVariant = (typeof styles.root.variantMap.variant)[number];

export interface ToastProps extends Toast {
  /**
   * Callback when the toast is dismissed
   */
  onDismiss: () => void;
}
