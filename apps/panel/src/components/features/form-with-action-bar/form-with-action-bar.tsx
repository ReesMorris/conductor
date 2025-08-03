'use client';

import { ActionBar, Form } from '@/components/ui';
import type { FieldValues } from 'react-hook-form';
import { styles } from './form-with-action-bar.styles';
import type { FormWithActionBarProps } from './form-with-action-bar.types';

export const FormWithActionBar = <
  TFieldValues extends FieldValues = FieldValues
>({
  form,
  children,
  className,
  id
}: FormWithActionBarProps<TFieldValues>) => {
  const { handleSave, actionBarProps, isSaving } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <>
      <Form
        id={id}
        className={className || styles.root}
        aria-busy={isSaving || undefined}
        onSubmit={handleSubmit}
      >
        {children}
      </Form>

      <ActionBar {...actionBarProps} />
    </>
  );
};
