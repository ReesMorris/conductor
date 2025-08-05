import type { ReactNode } from 'react';
import type { styles } from './dialog-content.styles';

export type DialogSize = (typeof styles.container.variantMap.size)[number];

export interface DialogContentProps {
  /**
   * The content of the dialog
   */
  children: ReactNode;

  /**
   * Optional className for the content
   */
  className?: string;

  /**
   * Whether to force mount the content
   */
  forceMount?: boolean;

  /**
   * The size of the dialog
   * @default 'md'
   */
  size?: DialogSize;
}
