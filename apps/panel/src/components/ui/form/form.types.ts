import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

export interface FormSubmitData<TFieldValues extends FieldValues> {
  data: TFieldValues;
  changedData: Partial<TFieldValues>;
}

export type HandleSubmit<TFieldValues extends FieldValues> = (
  data: FormSubmitData<TFieldValues>
) => Promise<void> | void;

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  /**
   * An optional error message to display at the top of the form.
   */
  errorMessage?: string | null;

  /**
   * The mode of the form validation.
   * @default 'onChange'
   */
  mode?: UseFormProps['mode'];

  /**
   * The default values for the form fields.
   */
  defaultValues?: UseFormProps<TFieldValues>['defaultValues'];

  /**
   * The resolver function for the form validation schema.
   * This is typically used with libraries like Zod or Yup for schema validation.
   */
  resolver?: UseFormProps<TFieldValues>['resolver'];

  /**
   * A callback function to handle form submission.
   * @param data - The form data, which is an object containing the values of the form fields.
   */
  onSubmit?: HandleSubmit<TFieldValues>;

  /**
   * The children of the form.
   * This can be a React node or a function that receives the form reference.
   */
  children:
    | React.ReactNode
    | ((form: UseFormReturn<TFieldValues>) => React.ReactNode);
}
