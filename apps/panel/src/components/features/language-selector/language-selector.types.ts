export interface LanguageSelectorProps {
  /**
   * Custom trigger element for the language selector.
   * If not provided, a default trigger will be used.
   */
  trigger?: React.ReactNode;

  /**
   * Whether to use the Radix `asChild` prop for the trigger.
   * @default true
   */
  triggerAsChild?: boolean;
}
