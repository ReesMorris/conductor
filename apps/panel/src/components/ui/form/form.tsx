'use client';

import { getDirtyFields } from '@/utils/get-dirty-fields';
import { AlertTriangle } from 'lucide-react';
import { forwardRef, useImperativeHandle } from 'react';
import { type FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Alert } from '../alert';
import type { FormProps } from './form.types';

export interface FormRef<TFieldValues extends FieldValues = FieldValues> {
  reset: (values?: TFieldValues) => void;
}

function FormInner<TFieldValues extends FieldValues = FieldValues>(
  {
    mode = 'onChange',
    defaultValues,
    errorMessage,
    onSubmit: onSubmitProp,
    resolver,
    className,
    children,
    ...props
  }: FormProps<TFieldValues>,
  ref: React.Ref<FormRef<TFieldValues>>
) {
  const form = useForm<TFieldValues>({ mode, defaultValues, resolver });
  const { handleSubmit, formState, reset } = form;
  const { isDirty, isSubmitting, dirtyFields } = formState;

  useImperativeHandle(
    ref,
    () => ({
      reset: (values?: TFieldValues) => {
        reset(values);
      }
    }),
    [reset]
  );

  // Handles form submission
  const onSubmit = async (data: TFieldValues) => {
    if (!isDirty || isSubmitting) {
      return;
    }

    await onSubmitProp?.({
      data,
      changedData: getDirtyFields(data, dirtyFields)
    });
  };

  return (
    <FormProvider {...form}>
      <form {...props} className={className} onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <Alert color='error' icon={<AlertTriangle />}>
            {errorMessage}
          </Alert>
        )}

        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormProvider>
  );
}

export const Form = forwardRef(FormInner) as <
  TFieldValues extends FieldValues = FieldValues
>(
  props: FormProps<TFieldValues> & { ref?: React.Ref<FormRef<TFieldValues>> }
) => React.ReactElement;

(Form as React.ForwardRefExoticComponent<unknown>).displayName = 'Form';
