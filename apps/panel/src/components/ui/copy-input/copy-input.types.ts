export interface CopyInputProps {
  /**
   * Optional aria-label for the copy button
   */
  'aria-label': string;

  /**
   * The value to display and copy
   */
  value: string;

  /**
   * Optional className for additional styling
   */
  className?: string;

  /**
   * Callback when value is copied
   */
  onCopy?: (value: string) => void;
}
