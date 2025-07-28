export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * If true, the link will not apply its default styles.
   * @default false
   */
  unstyled?: boolean;

  /**
   * Whether the link should be underlined.
   * @default false
   */
  underlined?: boolean;

  /**
   * The element type to render as if no `href` is provided.
   */
  fallbackElement?: React.ElementType;
}
