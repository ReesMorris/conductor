import type { GameServer } from '@conductor/database';

/**
 * Type for the internal game server representation (from database/auth)
 */
export type GameServerInternal = GameServer;

/**
 * Type for the API response game server representation
 */
export type GameServerResponse = GameServerInternal;
