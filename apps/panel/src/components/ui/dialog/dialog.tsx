import { Dialog as RadixDialog } from 'radix-ui';
import { Heading } from '../heading';
import { styles } from './dialog.styles';
import type { DialogProps } from './dialog.types';

export const Dialog = ({
  title,
  description,
  children,
  trigger,
  triggerAsChild,
  ...props
}: DialogProps) => {
  const classes = styles();

  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Trigger asChild={triggerAsChild} className={classes.trigger}>
        {trigger}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={classes.overlay} />
        <RadixDialog.Content className={classes.content}>
          <div className={classes.container}>
            <div className={classes.header}>
              <RadixDialog.Title asChild>
                <Heading level={2}>{title}</Heading>
              </RadixDialog.Title>
              {description && (
                <RadixDialog.Description className={classes.description}>
                  {description}
                </RadixDialog.Description>
              )}
            </div>

            {children}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
