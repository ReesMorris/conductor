import { transformS3Url } from '@/utils';
import type { BaseTransformer } from '../base';
import type { UserInternal, UserResponse } from './user.types';

/**
 * Transformer for user entities
 * Handles transformations between internal user representation and API responses
 */
class UserTransformer implements BaseTransformer<UserInternal, UserResponse> {
  /**
   * Transform a single user entity
   *
   * @param user - The internal user representation
   * @returns The transformed user for API response
   */
  transform(user: UserInternal): UserResponse {
    return {
      ...user,
      image: transformS3Url(user.image)
    };
  }

  /**
   * Transform multiple user entities
   *
   * @param users - Array of internal user representations
   * @returns Array of transformed users for API response
   */
  transformMany(users: UserInternal[]): UserResponse[] {
    return users.map(user => this.transform(user));
  }
}

/**
 * Singleton instance of the user transformer
 */
export const userTransformer = new UserTransformer();
