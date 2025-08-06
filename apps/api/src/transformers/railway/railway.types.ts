import type { Railway } from '@conductor/database';

/**
 * Type for the internal user representation (from database/auth)
 */
export type RailwayInternal = Railway;

/**
 * Type for the API response user representation
 */
export type RailwayResponse = Omit<RailwayInternal, 'accessToken'> & {
  accessTokenLastChars: string;
};
