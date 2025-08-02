export interface TooltipProviderProps {
  children: React.ReactNode;

  /**
   * The duration from when the mouse enters a tooltip trigger until the tooltip opens.
   * @default 50
   */
  delayDuration?: number;

  /**
   * How much time a user has to enter another trigger without incurring a delay again.
   * @default 0
   */
  skipDelayDuration?: number;
}
