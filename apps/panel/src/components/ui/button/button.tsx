import { cx } from '@/styled-system/css';
import { styles } from './button.styles';
import type { ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  ...props
}) => {
  return (
    <button className={cx(styles.button({ variant }), className)} {...props}>
      {props.children}
    </button>
  );
};
