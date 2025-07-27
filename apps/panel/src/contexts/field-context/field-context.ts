import { createContext } from 'react';
import type { FieldContextValue } from './field-context.types';

export const FieldContext = createContext<FieldContextValue | undefined>(
  undefined
);
