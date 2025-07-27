'use client';

import { FieldContext } from '@/contexts';
import { useContext } from 'react';

export const useField = () => {
  return useContext(FieldContext);
};
