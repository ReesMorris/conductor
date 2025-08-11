'use client';

import { createLogger } from '@/libs/logger';
import { trpc } from '@/providers/trpc';
import { useEffect } from 'react';

const log = createLogger('useUpdateCheck');

/**
 * Hook to check for available updates
 */
export const useUpdateCheck = () => {
  const {
    data: updateInfo,
    isLoading,
    error
  } = trpc.system.checkForUpdates.useQuery(undefined, {
    // Check for updates every hour while the app is open
    refetchInterval: 1000 * 60 * 60,
    // Don't refetch on window focus to avoid too many requests
    refetchOnWindowFocus: false,
    // Retry up to 3 times on failure
    retry: 3
  });

  // Log update availability to console for debugging
  useEffect(() => {
    if (updateInfo?.updateAvailable) {
      log.info(
        `Update available: ${updateInfo.currentVersion} -> ${updateInfo.latestVersion}`
      );
    }
  }, [updateInfo]);

  return {
    updateInfo,
    isLoading,
    error,
    hasUpdate: updateInfo?.updateAvailable ?? false
  };
};
