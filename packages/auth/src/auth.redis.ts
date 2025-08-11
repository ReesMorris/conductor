import type { SecondaryStorage } from 'better-auth/types';
import { createClient } from 'redis';

/**
 * Create a Redis secondary storage adapter for Better Auth
 * @param redisUrl - Redis connection URL
 * @returns SecondaryStorage implementation or undefined if Redis is not configured
 */
export const createRedisStorage = async (
  redisUrl?: string
): Promise<SecondaryStorage | undefined> => {
  console.log('Creating Redis storage for session management...');
  if (!redisUrl) {
    return undefined;
  }

  try {
    const redis = createClient({
      url: redisUrl
    });

    redis.on('error', err => {
      console.error('Redis Client Error:', err);
    });

    await redis.connect();
    console.log('✅ Redis connected for session storage');

    return {
      get: async (key: string) => {
        try {
          const value = await redis.get(key);
          return value || null;
        } catch (error) {
          console.error(`Redis GET error for key ${key}:`, error);
          return null;
        }
      },
      set: async (key: string, value: string, ttl?: number) => {
        try {
          if (ttl) {
            await redis.set(key, value, { EX: ttl });
          } else {
            await redis.set(key, value);
          }
        } catch (error) {
          console.error(`Redis SET error for key ${key}:`, error);
        }
      },
      delete: async (key: string) => {
        try {
          await redis.del(key);
        } catch (error) {
          console.error(`Redis DELETE error for key ${key}:`, error);
        }
      }
    };
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    console.log('Falling back to database storage for sessions');
    return undefined;
  }
};
