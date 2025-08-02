'use client';

import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/toast';
import { Toast as RadixToast } from 'radix-ui';
import { styles } from './toast-viewport.styles';

export const ToastViewport: React.FC = () => {
  const { toasts, dismiss } = useToast();

  return (
    <RadixToast.Viewport className={styles.viewport}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </RadixToast.Viewport>
  );
};
