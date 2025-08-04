'use client';

import { Field, Select } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { getTimeZones } from '@/utils/get-time-zones';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '../regional-settings-form';
import type { TimeZoneFieldProps } from './time-zone-field.types';

export const TimeZoneField: React.FC<TimeZoneFieldProps> = ({ disabled }) => {
  const { formatMessage } = useFormatMessage();
  const { register, formState } = useFormContext<FormData>();
  const locale = useLocale();

  // Fetch time zones based on the current locale
  const timeZones = useMemo(() => {
    return getTimeZones(locale);
  }, [locale]);

  return (
    <Field
      label={formatMessage('Time Zone')}
      errorMessage={formState.errors.timeZone?.message?.toString()}
    >
      <Select {...register('timeZone')} disabled={disabled}>
        {timeZones.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};
