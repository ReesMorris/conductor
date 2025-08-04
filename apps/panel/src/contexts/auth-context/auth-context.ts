'use client';

import type { AuthClient } from '@conductor/auth';
import { createContext } from 'react';

export const AuthContext = createContext<AuthClient | undefined>(undefined);
