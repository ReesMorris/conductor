import type { DialogProps } from '../../dialog';

export interface MultiStepModalRootProps
  extends Omit<DialogProps, 'title' | 'description'> {
  /**
   * Callback when flow is completed
   */
  onComplete?: () => void;
}
