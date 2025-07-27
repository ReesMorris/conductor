export interface FieldContextValue {
  /**
   * The unique ID for the form control element
   */
  controlId: string;

  /**
   * The unique ID for the label element
   */
  labelId: string;

  /**
   * The unique ID for the description element
   */
  descriptionId?: string;

  /**
   * The unique ID for the error element
   */
  errorId?: string;

  /**
   * Whether the field has an error
   */
  isInvalid?: boolean;

  /**
   * Whether the field is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether the field is required
   */
  isRequired?: boolean;

  /**
   * Whether the field is read-only
   */
  isReadOnly?: boolean;
}
