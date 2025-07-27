import { Link as IntlLink } from '@/i18n/navigation';
import type { LinkProps } from './link.types';

export const Link: React.FC<LinkProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  // If there's no href, return it as a span
  if (!href?.trim()) {
    return <span className={className}>{children}</span>;
  }

  return (
    <IntlLink href={href} {...props} className={className}>
      {children}
    </IntlLink>
  );
};
