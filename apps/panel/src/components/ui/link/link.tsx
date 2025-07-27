import { Link as IntlLink } from '@/i18n/navigation';
import { cx } from '@/styled-system/css';
import { styles } from './link.styles';
import type { LinkProps } from './link.types';

export const Link: React.FC<LinkProps> = ({
  href,
  underlined,
  className,
  children,
  ...props
}) => {
  // If there's no href, return it as a span
  if (!href?.trim()) {
    return <span className={className}>{children}</span>;
  }

  return (
    <IntlLink
      href={href}
      {...props}
      className={cx(styles.link({ underlined }), className)}
    >
      {children}
    </IntlLink>
  );
};
