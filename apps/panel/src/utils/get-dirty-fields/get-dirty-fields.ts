import type { DeepMap, DeepPartial, FieldValues } from 'react-hook-form';

/**
 * Extracts only the fields that have been modified in a form
 * @param data - The complete form data
 * @param dirtyFields - The dirty fields object from react-hook-form
 * @returns An object containing only the changed fields
 */
export const getDirtyFields = <TFieldValues extends FieldValues>(
  data: TFieldValues,
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>>
): Partial<TFieldValues> => {
  return Object.keys(dirtyFields).reduce(
    (acc, key) => {
      const typedKey = key as keyof TFieldValues;
      if (dirtyFields[key as keyof typeof dirtyFields]) {
        acc[typedKey] = data[typedKey];
      }
      return acc;
    },
    {} as Partial<TFieldValues>
  );
};
