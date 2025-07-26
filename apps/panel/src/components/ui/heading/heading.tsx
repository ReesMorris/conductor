import { cx } from '@/styled-system/css';
import { styles } from './heading.styles';
import type { HeadingProps } from './heading.types';

export const Heading: React.FC<HeadingProps> = ({
  level,
  className,
  unstyled,
  children,
  ...props
}) => {
  const Element = `h${level}` as React.ElementType;

  let classNames = className;
  if (!unstyled) {
    classNames = cx(classNames, styles.heading({ level }));
  }

  return (
    <Element className={classNames} {...props}>
      {children}
    </Element>
  );
};
