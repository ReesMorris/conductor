import { FieldContext } from '@/contexts';
import type { FieldProviderProps } from './field.types';

export const FieldProvider: React.FC<FieldProviderProps> = ({
  value,
  children
}) => {
  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
};
