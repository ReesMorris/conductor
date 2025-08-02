'use client';

import { Tooltip } from 'radix-ui';
import type { TooltipProviderProps } from './tooltip.types';

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 50,
  skipDelayDuration = 0
}) => {
  return (
    <Tooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </Tooltip.Provider>
  );
};
