import { RadioCard } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { Controller, useFormContext } from 'react-hook-form';
import type { AddServerFormData } from '../add-server-form';
import { styles } from './game-type-select.styles';

export const GameTypeSelect: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { control } = useFormContext<AddServerFormData>();

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
          <RadioCard.Item value='minecraft'>
            {formatMessage('Minecraft')}
          </RadioCard.Item>
          <RadioCard.Item value='valheim'>
            {formatMessage('Valheim')}
          </RadioCard.Item>
          <RadioCard.Item value='ark'>
            {formatMessage('ARK: Survival Evolved')}
          </RadioCard.Item>
          <RadioCard.Item value='factorio'>
            {formatMessage('Factorio')}
          </RadioCard.Item>
          <RadioCard.Item value='unturned'>
            {formatMessage('Unturned')}
          </RadioCard.Item>
          <RadioCard.Item value='rust'>{formatMessage('Rust')}</RadioCard.Item>
          <RadioCard.Item value='other'>
            {formatMessage('Other')}
          </RadioCard.Item>
        </RadioCard.Root>
      )}
    />
  );
};
