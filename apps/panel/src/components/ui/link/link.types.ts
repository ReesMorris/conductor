export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the link should be underlined.
   * @default false
   */
  underlined?: boolean;
}
