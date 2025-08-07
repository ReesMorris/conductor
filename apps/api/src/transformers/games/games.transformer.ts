import type { BaseTransformer } from '../base';
import type { GameInternal, GameResponse } from './games.types';

/**
 * Transformer for Game entities
 * Handles transformations between internal Game representation and API responses
 */
class GamesTransformer implements BaseTransformer<GameInternal, GameResponse> {
  /**
   * Transform a single Game entity
   *
   * @param game - The internal Game representation
   * @returns The transformed Game for API response
   */
  transform(game: GameInternal): GameResponse {
    return {
      id: game.id,
      displayName: game.displayName,
      defaultPort: game.defaultPort,
      protocol: game.protocol,
      railwayTemplateId: game.railwayTemplateId
    };
  }

  /**
   * Transform multiple Game entities
   *
   * @param games - Array of internal Game representations
   * @returns Array of transformed games for API response
   */
  transformMany(games: GameInternal[]): GameResponse[] {
    return games.map(game => this.transform(game));
  }
}

/**
 * Singleton instance of the Games transformer
 */
export const gamesTransformer = new GamesTransformer();
