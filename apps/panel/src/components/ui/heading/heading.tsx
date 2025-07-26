import { cx } from '@/styled-system/css';
import { styles } from './heading.styles';
import type { HeadingProps } from './heading.types';

export const Heading: React.FC<HeadingProps> = ({
  level,
  className,
  children,
  ...props
}) => {
  const Element = `h${level}` as React.ElementType;

  return (
    <Element className={cx(styles.heading({ level }), className)} {...props}>
      {children}
    </Element>
  );
};
