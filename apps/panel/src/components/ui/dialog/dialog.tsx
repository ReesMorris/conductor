import {
  AlertDialog as RadixAlertDialog,
  Dialog as RadixDialog
} from 'radix-ui';
import { Heading } from '../heading';
import { styles } from './dialog.styles';
import type { DialogProps } from './dialog.types';

export const Dialog = ({
  role,
  title,
  description,
  children,
  trigger,
  triggerAsChild,
  ...props
}: DialogProps) => {
  const classes = styles();

  // Determine which Radix component to use based on role
  const Component = role === 'alertdialog' ? RadixAlertDialog : RadixDialog;

  return (
    <Component.Root {...props}>
      <Component.Trigger asChild={triggerAsChild} className={classes.trigger}>
        {trigger}
      </Component.Trigger>
      <Component.Portal>
        <Component.Overlay className={classes.overlay} />
        <Component.Content className={classes.content}>
          <div className={classes.container}>
            <div className={classes.header}>
              <Component.Title asChild>
                <Heading level={2}>{title}</Heading>
              </Component.Title>
              {description && (
                <Component.Description className={classes.description}>
                  {description}
                </Component.Description>
              )}
            </div>

            {children}
          </div>
        </Component.Content>
      </Component.Portal>
    </Component.Root>
  );
};
