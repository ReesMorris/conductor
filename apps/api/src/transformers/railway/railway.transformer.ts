import type { BaseTransformer } from '../base';
import type { RailwayInternal, RailwayResponse } from './railway.types';

/**
 * Transformer for Railway entities
 * Handles transformations between internal Railway representation and API responses
 */
class RailwayTransformer
  implements BaseTransformer<RailwayInternal, RailwayResponse>
{
  /**
   * Transform a single Railway entity
   *
   * @param data - The internal Railway representation
   * @returns The transformed Railway for API response
   */
  transform(data: RailwayInternal): RailwayResponse {
    // biome-ignore lint/correctness/noUnusedVariables: We need to exclude projectToken from the response
    const { projectToken, ...rest } = data;

    return {
      ...rest,
      projectTokenSet: Boolean(data.projectToken),
      projectTokenLastChars: data.projectToken?.slice(-4)
    };
  }

  /**
   * Transform multiple Railway entities
   *
   * @param data - Array of internal Railway representations
   * @returns Array of transformed data for API response
   */
  transformMany(data: RailwayInternal[]): RailwayResponse[] {
    return data.map(item => this.transform(item));
  }
}

/**
 * Singleton instance of the Railway transformer
 */
export const railwayTransformer = new RailwayTransformer();
