'use client';

import { PermissionRequired } from '@/components/ui';
import { useUser } from '@/hooks';
import { styles } from './auth-wrapper.styles';
import type { AuthWrapperProps } from './auth-wrapper.types';

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  skeleton,
  requiredRole,
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

  // If user does not have the required role, return null or a message
  if (requiredRole && user.role !== requiredRole) {
    return <PermissionRequired requiredRole={requiredRole} />;
  }

  // Once user is authenticated, render children
  return <>{children}</>;
};
