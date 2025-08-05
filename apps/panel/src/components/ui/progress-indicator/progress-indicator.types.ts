export interface ProgressIndicatorProps {
  /**
   * Array of step metadata
   */
  steps: ProgressIndicatorStep[];

  /**
   * Current active step index
   */
  currentStep: number;

  /**
   * Accessible label for the progress indicator navigation
   * @default "Progress indicator"
   */
  ariaLabel?: string;

  /**
   * Whether to announce step changes to screen readers
   * @default true
   */
  announceStepChange?: boolean;
}

export interface ProgressIndicatorStep {
  /**
   * Step title for accessibility
   */
  title: string;

  /**
   * Step index
   */
  index: number;

  /**
   * Optional description for additional context
   */
  description?: string;
}

/**
 * Represents the status of a step in the progress indicator
 */
export type StepStatus = 'current' | 'completed' | 'pending';
