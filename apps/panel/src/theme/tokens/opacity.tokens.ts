import { defineTokens } from '@pandacss/dev';
import { semanticOpacity } from '../semantic-tokens/opacity.semantic-tokens';

export const opacity = defineTokens.opacity({
  ...semanticOpacity,
  '0': { value: 0 },
  '0.05': { value: 0.05 },
  '0.1': { value: 0.1 },
  '0.15': { value: 0.15 },
  '0.2': { value: 0.2 },
  '0.25': { value: 0.25 },
  '0.3': { value: 0.3 },
  '0.35': { value: 0.35 },
  '0.4': { value: 0.4 },
  '0.45': { value: 0.45 },
  '0.5': { value: 0.5 },
  '0.55': { value: 0.55 },
  '0.6': { value: 0.6 },
  '0.65': { value: 0.65 },
  '0.7': { value: 0.7 },
  '0.75': { value: 0.75 },
  '0.8': { value: 0.8 },
  '0.85': { value: 0.85 },
  '0.9': { value: 0.9 },
  '0.95': { value: 0.95 },
  '1': { value: 1 }
});
