export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon or element to display at the start of the input
   */
  iconStart?: React.ReactNode;

  /**
   * Icon or element to display at the end of the input
   */
  iconEnd?: React.ReactNode;

  /**
   * The children components (typically an Input)
   */
  children: React.ReactNode;
}
