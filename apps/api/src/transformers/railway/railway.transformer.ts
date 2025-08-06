import { decrypt } from '@/utils/encryption';
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
    const { projectToken, ...rest } = data;

    // Get last 4 chars of decrypted token for display (if token exists)
    let lastChars: string | undefined;
    if (projectToken) {
      try {
        const decryptedToken = decrypt(projectToken);
        lastChars = decryptedToken.slice(-4);
      } catch {
        // If decryption fails, token might be corrupted
        lastChars = undefined;
      }
    }

    return {
      ...rest,
      projectTokenSet: Boolean(projectToken),
      projectTokenLastChars: lastChars
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
