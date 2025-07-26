export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  /**
   * An optional error message to display at the top of the form.
   */
  errorMessage?: string | null;
}
