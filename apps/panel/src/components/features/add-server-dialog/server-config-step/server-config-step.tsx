'use client';

import { Field, Input } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import type { AddServerFormData } from '../add-server-form';
import { styles } from './server-config-step.styles';

export const ServerConfigStep: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext<AddServerFormData>();

  // Watch form values
  const gameType = useWatch({ control, name: 'gameType' });

  // Fetch game data to auto-fill server name and port
  const { data: games } = trpc.games.list.useQuery();
  const selectedGame = games?.find(g => g.id === gameType);

  // Auto-fill server name and port when game is selected
  useEffect(() => {
    if (selectedGame) {
      setValue('serverName', selectedGame.displayName);
    }
  }, [selectedGame, setValue]);

  return (
    <div className={styles.container}>
      <Controller
        name='serverName'
        control={control}
        render={({ field }) => (
          <Field
            label={formatMessage('Server Name')}
            errorMessage={errors.serverName?.message}
          >
            <Input
              {...field}
              placeholder={formatMessage('My Minecraft Server')}
            />
          </Field>
        )}
      />

      <Controller
        name='domain'
        control={control}
        render={({ field }) => (
          <Field
            label={formatMessage('Domain (optional)')}
            helpText={formatMessage(
              'Leave empty to use a Railway-generated domain'
            )}
            errorMessage={errors.domain?.message}
          >
            <Input {...field} placeholder='mc.myserver.com' />
          </Field>
        )}
      />
    </div>
  );
};
