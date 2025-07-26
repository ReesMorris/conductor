import { FieldContext } from './field-context';
import type { FieldContextProviderProps } from './field-context.types';

export const FieldContextProvider: React.FC<FieldContextProviderProps> = ({
  value,
  children
}) => {
  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
};
