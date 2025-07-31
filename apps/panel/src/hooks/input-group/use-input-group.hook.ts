'use client';

import { InputGroupContext } from '@/contexts/input-group-context';
import { useContext } from 'react';

export const useInputGroup = () => {
  return useContext(InputGroupContext);
};
