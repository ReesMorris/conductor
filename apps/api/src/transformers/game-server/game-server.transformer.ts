import type { BaseTransformer } from '../base';
import type {
  GameServerInternal,
  GameServerResponse
} from './game-server.types.ts';

/**
 * Transformer for Game Server entities
 * Handles transformations between internal Game Server representation and API responses
 */
class GameServerTransformer
  implements BaseTransformer<GameServerInternal, GameServerResponse>
{
  /**
   * Transform a single Server entity
   *
   * @param data - The internal Server representation
   * @returns The transformed Server for API response
   */
  transform(data: GameServerInternal): GameServerResponse {
    // Generate connection URL from Railway URL
    const connectionUrl = data.railwayUrl || 'Pending deployment...';

    return {
      ...data,
      connectionUrl
    } as GameServerResponse;
  }

  /**
   * Transform multiple Server entities
   *
   * @param data - Array of internal Server representations
   * @returns Array of transformed data for API response
   */
  transformMany(data: GameServerInternal[]): GameServerResponse[] {
    return data.map(item => this.transform(item));
  }
}

/**
 * Singleton instance of the Server transformer
 */
export const gameServerTransformer = new GameServerTransformer();
