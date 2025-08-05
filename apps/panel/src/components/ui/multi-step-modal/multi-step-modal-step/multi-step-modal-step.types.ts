export interface MultiStepModalStepProps {
  /**
   * Step title
   */
  title: string;

  /**
   * Step description
   */
  description?: string;

  /**
   * Step content
   */
  children: React.ReactNode;

  /**
   * Whether this step can proceed to next
   */
  canProceed?: boolean;

  /**
   * Custom label for the next button
   */
  nextButtonLabel?: string;

  /**
   * Custom label for the complete button (last step)
   */
  completeButtonLabel?: string;
}
