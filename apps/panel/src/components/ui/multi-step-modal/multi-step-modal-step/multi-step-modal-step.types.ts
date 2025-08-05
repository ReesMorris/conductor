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
}
