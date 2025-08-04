import type { TimeZone } from './get-time-zones.types';
import { formatTimeZoneLabel, offsetToMinutes } from './utils';

export const getTimeZones = (locale: string): TimeZone[] => {
  const now = new Date();
  const timeZones = Intl.supportedValuesOf('timeZone');
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const options = timeZones.map(tz => {
    try {
      const formatter = new Intl.DateTimeFormat(locale, {
        timeZone: tz,
        timeZoneName: 'shortOffset'
      });

      const parts = formatter.formatToParts(now);
      const offsetPart = parts.find(part => part.type === 'timeZoneName');
      const offset = offsetPart?.value || '+00:00';

      const label = formatTimeZoneLabel(tz);

      return {
        value: tz,
        label: `${label} ${offset}`,
        offset,
        isUserTimeZone: tz === userTimeZone
      };
    } catch {
      // Fallback for unsupported timezones
      return {
        value: tz,
        label: tz,
        offset: '+00:00',
        isUserTimeZone: false
      };
    }
  });

  // Sort by offset (in minutes) and then by label
  return options.sort((a, b) => {
    // User's timezone always comes first
    if (a.isUserTimeZone) {
      return -1;
    } else if (b.isUserTimeZone) {
      return 1;
    }

    const offsetA = offsetToMinutes(a.offset);
    const offsetB = offsetToMinutes(b.offset);

    if (offsetA !== offsetB) {
      return offsetA - offsetB;
    }

    return a.label.localeCompare(b.label, locale);
  });
};
