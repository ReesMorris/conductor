import type { Game } from '@conductor/database';

/**
 * Internal representation of a Game from the database
 */
export type GameInternal = Game;

/**
 * API response representation of a Game
 */
export interface GameResponse {
  id: string;
  displayName: string;
  defaultPort: number;
  protocol: 'TCP' | 'UDP';
  railwayTemplateId: string;
}
