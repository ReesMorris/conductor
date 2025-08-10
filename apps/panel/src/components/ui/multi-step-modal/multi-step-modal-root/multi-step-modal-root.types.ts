import type { DialogProps } from '../../dialog';

export interface MultiStepModalRootProps
  extends Omit<DialogProps, 'title' | 'description'> {
  /**
   * Callback when flow is completed
   * Return false or throw to prevent closing the modal
   */
  onComplete?: () => void | boolean | Promise<void | boolean>;
}
