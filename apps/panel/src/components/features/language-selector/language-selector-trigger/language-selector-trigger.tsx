import { Button } from '@/components/ui';
import { ChevronDownIcon, GlobeIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { styles } from './language-selector-trigger.styles';
import type { LanguageSelectorTriggerProps } from './language-selector-trigger.types';

export const LanguageSelectorTrigger: React.FC<
  LanguageSelectorTriggerProps
> = ({ isOpen, ...props }) => {
  const t = useTranslations('language_selector');
  const locale = useLocale();

  return (
    <Button
      type='button'
      variant='outlined'
      size='sm'
      aria-label={t('label')}
      {...props}
    >
      <GlobeIcon />
      <div className={styles.locale}>{locale}</div>
      <div className={styles.chevron} data-open={isOpen || undefined}>
        <ChevronDownIcon />
      </div>
    </Button>
  );
};
