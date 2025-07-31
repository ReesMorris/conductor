import { DropdownMenu } from '@/components/ui';
import { GlobeIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { LanguageSelectorTriggerProps } from './language-selector-trigger.types';

export const LanguageSelectorTrigger: React.FC<
  LanguageSelectorTriggerProps
> = ({ isOpen, currentLanguageName, ...props }) => {
  const t = useTranslations('language_selector');
  const locale = useLocale();

  return (
    <DropdownMenu.Trigger
      startElement={<GlobeIcon />}
      isOpen={isOpen}
      size='sm'
      aria-label={t('label')}
      {...props}
    >
      {currentLanguageName || locale}
    </DropdownMenu.Trigger>
  );
};
