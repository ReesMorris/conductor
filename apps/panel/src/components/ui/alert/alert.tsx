import { cx } from '@/styled-system/css';
import { styles } from './alert.styles';
import type { AlertProps } from './alert.types';

export const Alert: React.FC<AlertProps> = ({
  color,
  icon,
  title,
  children,
  className,
  ...props
}) => {
  const classes = styles({ color });

  return (
    <div
      aria-live='assertive'
      {...props}
      className={cx(classes.container, className)}
    >
      <div className={classes.content}>
        <div className={classes.icon}>{icon}</div>
        <div>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{children}</div>
        </div>
      </div>
    </div>
  );
};
