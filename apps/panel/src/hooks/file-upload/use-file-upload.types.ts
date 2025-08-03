export interface FileValidationOptions {
  /**
   * Accepted MIME types (e.g., ['image/jpeg', 'image/png'])
   */
  acceptedTypes?: string[];

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Minimum file size in bytes
   */
  minSize?: number;
}

export interface UseFileUploadOptions {
  /**
   * Allow multiple file selection
   */
  multiple?: boolean;

  /**
   * File validation options
   */
  validation?: FileValidationOptions;

  /**
   * Callback when files are selected
   */
  onFileSelect?: (files: File[]) => void;

  /**
   * Callback when validation error occurs
   */
  onError?: (error: string) => void;
}

export interface UseFileUploadReturn {
  /**
   * Currently selected files
   */
  selectedFiles: File[];

  /**
   * Preview URLs for selected files (for images)
   */
  previewUrls: string[];

  /**
   * Reference to the hidden file input element
   */
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  /**
   * Handler for file input change events
   */
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Open the file picker dialog
   */
  openFilePicker: () => void;

  /**
   * Remove a specific file by index
   */
  removeFile: (index: number) => void;

  /**
   * Clear all selected files
   */
  clearFiles: () => void;

  /**
   * Current error message (if any)
   */
  error: string | null;
}

export interface FileValidationResult {
  /**
   * Whether the file passed validation
   */
  valid: boolean;

  /**
   * Error details if validation failed
   */
  error?: {
    /**
     * Error code for translation
     */
    code: 'INVALID_TYPE' | 'FILE_TOO_LARGE' | 'FILE_TOO_SMALL';

    /**
     * Data for the error message
     */
    data: {
      extensions?: string;
      maxSize?: number;
      minSize?: number;
    };
  };
}
