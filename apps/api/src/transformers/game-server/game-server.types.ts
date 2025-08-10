import type {
  Game,
  GameServer,
  GameServerConnection
} from '@conductor/database';

/**
 * Type for the internal game server representation (from database/auth)
 */
export type GameServerInternal = GameServer & {
  game?: Game;
  connections?: GameServerConnection[];
};

/**
 * Type for the API response game server representation
 */
export type GameServerResponse = GameServerInternal & {
  connectionUrl?: string;
};
