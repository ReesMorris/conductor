/**
 * Formats a timezone identifier into a human-readable label
 */
export const formatTimeZoneLabel = (tz: string): string => {
  // Handle special cases
  if (tz === 'UTC' || tz === 'GMT') {
    return tz;
  }

  const parts = tz.split('/');
  if (parts.length === 1) {
    return tz;
  }

  // Keep the region for context (e.g., "America", "Europe")
  const region = parts[0].replace(/_/g, ' ');
  const location = parts.slice(1).join('/').replace(/_/g, ' ');

  // For common regions, we can abbreviate
  const regionAbbreviations: Record<string, string> = {
    America: 'Americas',
    Europe: 'Europe',
    Asia: 'Asia',
    Africa: 'Africa',
    Australia: 'Australia',
    Pacific: 'Pacific',
    Atlantic: 'Atlantic',
    Indian: 'Indian',
    Antarctica: 'Antarctica'
  };

  const displayRegion = regionAbbreviations[region] || region;
  return `${location} (${displayRegion})`;
};
