export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The level of the heading element.
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * If true, the heading will not apply any default styles.
   * Useful for custom styling.
   */
  unstyled?: boolean;
}
