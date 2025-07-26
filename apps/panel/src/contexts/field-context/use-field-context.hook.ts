import { useContext } from 'react';
import { FieldContext } from './field-context';

export const useFieldContext = () => {
  return useContext(FieldContext);
};
