export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label for the field
   */
  label: string;

  /**
   * Optional content to display on the right side of the label
   */
  labelSuffix?: React.ReactNode;

  /**
   * The help text for the field
   */
  helpText?: string;

  /**
   * The error message for the field
   */
  errorMessage?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Whether the field is disabled
   */
  disabled?: boolean;

  /**
   * Whether the field is read-only
   */
  readonly?: boolean;
}
