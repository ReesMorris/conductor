'use client';

import { Field, Select } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { getTimeZones } from '@/utils/get-time-zones';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import type { TimeZoneFieldProps } from './time-zone-field.types';

export const TimeZoneField: React.FC<TimeZoneFieldProps> = ({ disabled }) => {
  const { formatMessage } = useFormatMessage();
  const locale = useLocale();

  const timeZones = useMemo(() => getTimeZones(locale), [locale]);

  return (
    <Field label={formatMessage('Time Zone')}>
      <Select disabled={disabled}>
        {timeZones.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};
