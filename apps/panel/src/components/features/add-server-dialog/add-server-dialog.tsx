'use client';

import { MultiStepModal } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { useFormContext } from 'react-hook-form';
import type { AddServerDialogProps } from './add-server-dialog.types';
import { AddServerForm } from './add-server-form';
import { DeployStep } from './deploy-step';
import { GameTypeSelect } from './game-type-select';

const AddServerDialogInner: React.FC<AddServerDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { formatMessage } = useFormatMessage();
  const { watch, reset, formState } = useFormContext();
  const { defaultValues } = formState;
  const gameType = watch('gameType');

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset(defaultValues); // Reset the form to default values when the dialog is closed
    }

    onOpenChange(isOpen);
  };

  return (
    <MultiStepModal.Root
      role='alertdialog'
      open={open}
      onOpenChange={handleOpenChange}
      onComplete={() => console.log('Completed!')}
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
        description={formatMessage(
          'Set up your server with the necessary configurations'
        )}
      >
        <DeployStep />
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
