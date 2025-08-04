export interface TimeZone {
  /**
   * The IANA time zone identifier (e.g., "America/New_York").
   */
  value: string;

  /**
   * The human-readable display name of the time zone.
   */
  label: string;

  /**
   * The UTC offset of the time zone (e.g., "+05:00", "-03:00").
   */
  offset: string;

  /**
   * Whether this is the user's current time zone.
   */
  isUserTimeZone?: boolean;
}
