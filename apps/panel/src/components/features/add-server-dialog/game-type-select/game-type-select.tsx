import { Alert, RadioCard } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { trpc } from '@/providers/trpc';
import { GhostIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import type { AddServerFormData } from '../add-server-form';
import { GameTypeSelectSkeleton } from './game-type-select.skeleton';
import { styles } from './game-type-select.styles';

export const GameTypeSelect: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { control } = useFormContext<AddServerFormData>();

  const { data } = trpc.games.list.useQuery();
  if (!data) {
    return <GameTypeSelectSkeleton />;
  }

  if (data.length === 0) {
    return (
      <Alert color='error' icon={<GhostIcon />}>
        {formatMessage('There are no games; did the database migrate?')}
      </Alert>
    );
  }

  return (
    <Controller
      name='gameType'
      control={control}
      render={({ field }) => (
        <RadioCard.Root
          value={field.value}
          onValueChange={field.onChange}
          aria-label={formatMessage('Select a game type')}
          className={styles.grid}
        >
          {data?.map(game => (
            <RadioCard.Item key={game.id} value={game.id}>
              {game.displayName}
            </RadioCard.Item>
          ))}
        </RadioCard.Root>
      )}
    />
  );
};
