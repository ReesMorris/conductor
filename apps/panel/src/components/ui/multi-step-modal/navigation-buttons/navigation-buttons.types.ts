export interface NavigationButtonsProps {
  /**
   * Whether this is the first step
   */
  isFirstStep: boolean;

  /**
   * Whether this is the last step
   */
  isLastStep: boolean;

  /**
   * Whether can proceed to next step
   */
  canProceed: boolean;

  /**
   * Navigate to previous step
   */
  previous: () => void;

  /**
   * Navigate to next step
   */
  next: () => void;

  /**
   * Complete the flow
   */
  complete: () => void;

  /**
   * Custom label for the next button
   */
  nextButtonLabel?: string;

  /**
   * Custom label for the complete button
   */
  completeButtonLabel?: string;
}
