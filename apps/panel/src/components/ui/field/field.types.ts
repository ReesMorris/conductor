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

export interface FieldSkeletonProps {
  /**
   * Width of the label skeleton
   * @default '30%'
   */
  labelWidth?: string;

  /**
   * Width of the input skeleton
   * @default '100%'
   */
  inputWidth?: string;

  /**
   * Height of the input skeleton
   * @default token('sizes.ui.md')
   */
  inputHeight?: string;

  /**
   * Width of the label suffix skeleton
   */
  labelSuffixWidth?: string;

  /**
   * Width of the help text skeleton
   */
  helpTextWidth?: string;
}
