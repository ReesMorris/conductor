import type { FieldIds } from './generate-ids.types';

/**
 * Generates unique IDs for form field elements based on a base ID.
 *
 * @param baseId - The base ID to use for generating unique IDs.
 * @returns An object containing the generated IDs for control, label, description, and error elements.
 */
export const generateIds = (baseId: string): FieldIds => {
  return {
    controlId: `${baseId}-control`,
    labelId: `${baseId}-label`,
    descriptionId: `${baseId}-description`,
    errorId: `${baseId}-error`
  };
};
