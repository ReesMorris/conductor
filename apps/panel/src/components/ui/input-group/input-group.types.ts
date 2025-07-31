export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon or element to display at the start of the input
   */
  startElement?: React.ReactNode;

  /**
   * Icon or element to display at the end of the input
   */
  endElement?: React.ReactNode;

  /**
   * The children components (typically an Input)
   */
  children: React.ReactNode;
}
