'use client';

import { Heading } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { FormActions, SettingsGrid } from '@/views/settings/components';
import { TimeZoneField } from './time-zone-field';

const ID = 'regional-settings';

export const RegionalSettings = () => {
  const { formatMessage } = useFormatMessage();

  return (
    <section aria-labelledby={ID}>
      <Heading id={ID} level={2}>
        {formatMessage('Regional Settings')}
      </Heading>

      <SettingsGrid>
        <TimeZoneField />
      </SettingsGrid>

      <FormActions />
    </section>
  );
};
