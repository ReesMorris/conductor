import { cx } from '@/styled-system/css';
import { LoaderCircle } from 'lucide-react';
import { styles } from './button.styles';
import type { ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = ({
  color,
  variant,
  isLoading,
  className,
  ...props
}) => {
  const disabled = props.disabled || isLoading;

  return (
    <button
      {...props}
      aria-busy={isLoading || undefined}
      disabled={disabled}
      className={cx('group', styles.button({ color, variant }), className)}
    >
      <div className={styles.content}>{props.children}</div>
      <div className={styles.loadingSpinner}>
        <LoaderCircle />
      </div>
    </button>
  );
};
