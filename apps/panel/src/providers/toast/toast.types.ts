export interface ToastProviderProps {
  /**
   * The time in milliseconds that should elapse before automatically closing each toast.
   * @default 5000
   */
  duration?: number;

  /**
   * The direction of the pointer swipe that should close the toast.
   * @default 'right'
   */
  swipeDirection?: 'up' | 'down' | 'left' | 'right';

  /**
   * The distance in pixels that the swipe gesture must travel before a close is triggered.
   * @default 50
   */
  swipeThreshold?: number;

  /**
   * The children to render within the ToastProvider.
   */
  children: React.ReactNode;
}
