import { DropdownMenu } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { GlobeIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import type { LanguageSelectorTriggerProps } from './language-selector-trigger.types';

export const LanguageSelectorTrigger: React.FC<
  LanguageSelectorTriggerProps
> = ({ isOpen, currentLanguageName, ...props }) => {
  const locale = useLocale();
  const { formatMessage } = useFormatMessage();

  return (
    <DropdownMenu.Trigger
      startElement={<GlobeIcon />}
      isOpen={isOpen}
      size='sm'
      aria-label={formatMessage('Change language')}
      {...props}
    >
      {currentLanguageName || locale}
    </DropdownMenu.Trigger>
  );
};
