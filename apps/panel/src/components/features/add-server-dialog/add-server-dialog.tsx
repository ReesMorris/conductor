'use client';

import { MultiStepModal } from '@/components/ui';
import { useToast } from '@/hooks/toast';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { useFormContext } from 'react-hook-form';
import type { AddServerDialogProps } from './add-server-dialog.types';
import { AddServerForm, type AddServerFormData } from './add-server-form';
import { GameTypeSelect } from './game-type-select';
import { ServerConfigStep } from './server-config-step';

const AddServerDialogInner: React.FC<AddServerDialogProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const { formatMessage } = useFormatMessage();
  const toast = useToast();
  const { watch, reset, formState, handleSubmit } =
    useFormContext<AddServerFormData>();
  const { defaultValues } = formState;
  const gameType = watch('gameType');
  const serverName = watch('serverName');

  const deployMutation = trpc.servers.deploy.useMutation();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset(defaultValues); // Reset the form to default values when the dialog is closed
    }

    onOpenChange(isOpen);
  };

  const handleComplete = () => {
    // Use handleSubmit to validate the form
    return new Promise<boolean>(resolve => {
      handleSubmit(
        async data => {
          try {
            // Form is valid, deploy the server
            await deployMutation.mutateAsync(data);
            toast.success(formatMessage('Server deployed!'));

            // Success - close dialog and reset form
            onOpenChange(false);
            reset(defaultValues);

            // Call the onSuccess callback to refresh the server list
            onSuccess?.();

            resolve(true);
          } catch (error) {
            // Mutation failed, show error but keep dialog open
            toast.error(
              formatMessage('Failed to deploy server'),
              error instanceof Error ? error.message : 'Unknown error'
            );
            resolve(false);
          }
        },
        () => {
          // Form has validation errors - keep dialog open
          resolve(false);
        }
      )();
    });
  };

  return (
    <MultiStepModal.Root
      role='alertdialog'
      open={open}
      onOpenChange={handleOpenChange}
      onComplete={handleComplete}
    >
      <MultiStepModal.Step
        title={formatMessage('Select Your Game Server')}
        description={formatMessage(
          'Choose the type of game server you want to deploy'
        )}
        canProceed={!!gameType}
      >
        <GameTypeSelect />
      </MultiStepModal.Step>
      <MultiStepModal.Step
        title={formatMessage('Configure Your Server')}
        description={formatMessage('Set up your server connection details')}
        canProceed={!!serverName}
        completeButtonLabel={formatMessage('Deploy Server')}
      >
        <ServerConfigStep />
      </MultiStepModal.Step>
    </MultiStepModal.Root>
  );
};

export const AddServerDialog: React.FC<AddServerDialogProps> = props => {
  return (
    <AddServerForm>
      <AddServerDialogInner {...props} />
    </AddServerForm>
  );
};
