import { Link as IntlLink } from '@/i18n/navigation';
import { cx } from '@/styled-system/css';
import { styles } from './link.styles';
import type { LinkProps } from './link.types';

export const Link: React.FC<LinkProps> = ({
  href,
  unstyled,
  underlined,
  fallbackElement,
  className,
  children,
  ...props
}) => {
  // If unstyled, don't apply any custom styles
  let classes = className;
  if (!unstyled) {
    classes = cx(classes, styles.link({ underlined }));
  }

  // If there's no href, return it as a span
  if (!href?.trim()) {
    const Element = fallbackElement || 'span';
    return (
      <Element {...props} className={classes}>
        {children}
      </Element>
    );
  }

  return (
    <IntlLink href={href} {...props} className={classes}>
      {children}
    </IntlLink>
  );
};
