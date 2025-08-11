'use client';

import { Badge, Link } from '@/components/ui';
import { useUpdateCheck } from '@/hooks';
import { useFormatMessage } from '@/i18n/format-message';
import { TrendingUpIcon } from 'lucide-react';

export const UpdateBadge: React.FC = () => {
  const { formatMessage } = useFormatMessage();
  const { updateInfo, hasUpdate } = useUpdateCheck();

  // Don't show anything if no update is available
  if (!hasUpdate || !updateInfo) {
    return null;
  }

  return (
    <Link href={updateInfo.releaseUrl ?? '#'} target='_blank'>
      <Badge color='green'>
        <TrendingUpIcon />
        {formatMessage('Update Available')}
      </Badge>
    </Link>
  );
};
