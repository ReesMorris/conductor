import type { createAuthClient } from 'better-auth/react';
import { createContext } from 'react';

export const AuthContext = createContext<
  ReturnType<typeof createAuthClient> | undefined
>(undefined);
