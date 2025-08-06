import { env } from '@/env';

export const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
export const ENCRYPTION_KEY = Buffer.from(env.ENCRYPTION_KEY, 'hex');
