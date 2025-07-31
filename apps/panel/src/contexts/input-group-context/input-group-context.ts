import { createContext } from 'react';
import type { InputGroupContextValue } from './input-group-context.types';

export const InputGroupContext = createContext<
  InputGroupContextValue | undefined
>(undefined);
