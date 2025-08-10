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
  onOpenChange
}) => {
  const { formatMessage } = useFormatMessage();
  const toast = useToast();
  const { watch, reset, formState, handleSubmit } =
    useFormContext<AddServerFormData>();
  const { defaultValues } = formState;
  const gameType = watch('gameType');
  const serverName = watch('serverName');

  const deployMutation = trpc.servers.deploy.useMutation({
    onSuccess: data => {
      toast.success(
        formatMessage('Server deployed successfully!'),
        formatMessage('Connection URL: {url}', { url: data.connectionUrl })
      );
      onOpenChange(false);
      reset(defaultValues);
    },
    onError: error => {
      toast.error(formatMessage('Failed to deploy server'), error.message);
    }
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset(defaultValues); // Reset the form to default values when the dialog is closed
    }

    onOpenChange(isOpen);
  };

  const handleComplete = handleSubmit(data => {
    deployMutation.mutate(data);
  });

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
