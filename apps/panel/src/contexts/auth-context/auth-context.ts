import type { authClient } from '@/libs';
import { createContext } from 'react';

export const AuthContext = createContext<
  ReturnType<typeof authClient> | undefined
>(undefined);
