import type {
  FileValidationOptions,
  FileValidationResult
} from '../use-file-upload.types';

/**
 * Validate a file against the provided options
 */
export const validateFile = (
  file: File,
  options: FileValidationOptions
): FileValidationResult => {
  // Check file type
  if (
    options.acceptedTypes &&
    options.acceptedTypes.length > 0 &&
    !options.acceptedTypes.includes(file.type)
  ) {
    const extensions = options.acceptedTypes
      .map(type => type.split('/')[1])
      .join(', ');

    return {
      valid: false,
      error: {
        code: 'invalid_type',
        data: { extensions }
      }
    };
  }

  // Check maximum size
  if (options.maxSize && file.size > options.maxSize) {
    return {
      valid: false,
      error: {
        code: 'file_too_large',
        data: { maxSize: options.maxSize }
      }
    };
  }

  // Check minimum size
  if (options.minSize && file.size < options.minSize) {
    return {
      valid: false,
      error: {
        code: 'file_too_small',
        data: { minSize: options.minSize }
      }
    };
  }

  return { valid: true };
};
