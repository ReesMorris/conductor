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
          <p className={classes.title}>{title}</p>
          <p className={classes.description}>{children}</p>
        </div>
      </div>
    </div>
  );
};
