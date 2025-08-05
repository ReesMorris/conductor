export interface MultiStepModalContextValue {
  /**
   * Current active step index
   */
  currentStep: number;

  /**
   * Total number of steps
   */
  totalSteps: number;

  /**
   * Step metadata
   */
  steps: StepMetadata[];

  /**
   * Navigate to next step
   */
  next: () => void;

  /**
   * Navigate to previous step
   */
  previous: () => void;

  /**
   * Navigate to specific step
   */
  goToStep: (index: number) => void;

  /**
   * Check if can proceed to next step
   */
  canProceed: boolean;

  /**
   * Set whether current step can proceed
   */
  setCanProceed: (canProceed: boolean) => void;

  /**
   * Shared data between steps
   */
  stepData: Record<string, unknown>;

  /**
   * Update shared step data
   */
  setStepData: (data: Record<string, unknown>) => void;

  /**
   * Complete the multi-step flow
   */
  complete: () => void;
}

export interface StepMetadata {
  /**
   * Title of the step
   */
  title: string;

  /**
   * Description of the step
   */
  description?: string;

  /**
   * Index position of the step in the flow
   */
  index: number;

  /**
   * Custom label for the next button
   */
  nextButtonLabel?: string;

  /**
   * Custom label for the complete button
   */
  completeButtonLabel?: string;
}
