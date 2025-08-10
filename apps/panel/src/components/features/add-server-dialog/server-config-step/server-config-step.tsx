'use client';

import { Field, Input, RadioCard } from '@/components/ui';
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
  const connectionType = useWatch({ control, name: 'connectionType' });

  // Fetch game data to auto-fill server name and port
  const { data: games } = trpc.games.list.useQuery();
  const selectedGame = games?.find(g => g.id === gameType);

  // Auto-fill server name and port when game is selected
  useEffect(() => {
    if (selectedGame) {
      setValue('serverName', selectedGame.displayName);
      setValue('proxyPort', selectedGame.defaultPort);
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
        name='connectionType'
        control={control}
        render={({ field }) => (
          <Field label={formatMessage('Connection Type')}>
            <RadioCard.Root
              value={field.value}
              onValueChange={field.onChange}
              className={styles.connectionTypeGrid}
              aria-label={formatMessage('Connection type selection')}
            >
              <RadioCard.Item value='railway'>
                {formatMessage('Railway URL')}
              </RadioCard.Item>
              <RadioCard.Item value='domain'>
                {formatMessage('Custom Domain')}
              </RadioCard.Item>
            </RadioCard.Root>
          </Field>
        )}
      />

      {connectionType === 'domain' && (
        <Controller
          name='domain'
          control={control}
          render={({ field }) => (
            <Field
              label={formatMessage('Domain')}
              helpText={formatMessage(
                'Your custom domain (e.g., mc.myserver.com)'
              )}
              errorMessage={errors.domain?.message}
            >
              <Input {...field} placeholder='mc.myserver.com' />
            </Field>
          )}
        />
      )}

      <Controller
        name='proxyPort'
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <Field
            label={formatMessage('Port')}
            helpText={formatMessage('The port players will use to connect')}
            errorMessage={errors.proxyPort?.message}
          >
            <Input
              {...field}
              type='number'
              onChange={e => onChange(Number.parseInt(e.target.value, 10))}
              min={1}
              max={65535}
            />
          </Field>
        )}
      />
    </div>
  );
};
