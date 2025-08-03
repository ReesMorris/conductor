'use client';

import { useUser } from '@/hooks';
import { styles } from './auth-wrapper.styles';
import type { AuthWrapperProps } from './auth-wrapper.types';

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  skeleton,
  debug = false
}) => {
  const { user } = useUser();

  // In debug mode, we render the skeleton on top of the children
  if (debug) {
    return (
      <div className={styles.debugContainer}>
        <div className={styles.debugOverlay}>{skeleton}</div>
        {children}
      </div>
    );
  }

  // Show skeleton whilst user is being authenticated
  if (!user) {
    return <>{skeleton}</>;
  }

  // Once user is authenticated, render children
  return <>{children}</>;
};
