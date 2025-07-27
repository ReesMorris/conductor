import type { FieldContextValue } from '@/contexts';

export interface FieldProviderProps {
  /**
   * The value to provide to the context
   */
  value: FieldContextValue;

  /**
   * The children to render within the context provider
   */
  children: React.ReactNode;
}
