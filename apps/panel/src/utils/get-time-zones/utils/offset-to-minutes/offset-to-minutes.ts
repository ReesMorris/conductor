const OFFSET_REGEX = /([+-])(\d{2}):?(\d{2})/;

/**
 * Converts an offset string like "+05:30" or "-03:00" to total minutes
 */
export const offsetToMinutes = (offset: string): number => {
  const match = offset.match(OFFSET_REGEX);
  if (!match) {
    return 0;
  }

  const [, sign, hours, minutes] = match;
  const totalMinutes = Number.parseInt(hours) * 60 + Number.parseInt(minutes);
  return sign === '-' ? -totalMinutes : totalMinutes;
};
