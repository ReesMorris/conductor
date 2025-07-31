import { cx } from '@/styled-system/css';
import { LoaderCircle } from 'lucide-react';
import { styles } from './button.styles';
import type { ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = ({
  size,
  shape,
  variant,
  isLoading,
  className,
  contentClassName,
  ...props
}) => {
  const disabled = props.disabled || isLoading;

  return (
    <button
      {...props}
      aria-busy={isLoading || undefined}
      disabled={disabled}
      className={cx(
        'group',
        styles.button({ size, shape, variant }),
        className
      )}
    >
      <div className={cx(styles.content, contentClassName)}>
        {props.children}
      </div>
      <div className={styles.loadingSpinner}>
        <LoaderCircle />
      </div>
    </button>
  );
};
