'use client';

import { Dialog } from '@/components/ui';
import { usePathname, useRouter } from '@/i18n/navigation';
import { CheckIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { LANGUAGES } from './language-selector.constants';
import { styles } from './language-selector.styles';
import type { LanguageSelectorProps } from './language-selector.types';

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  trigger,
  triggerAsChild,
  onLanguageChange,
  ...props
}) => {
  const t = useTranslations('language_selector');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(
        { pathname },
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { locale: newLocale }
      );
      onLanguageChange?.(newLocale);
    });
  };

  return (
    <Dialog
      trigger={trigger}
      triggerAsChild={triggerAsChild}
      title={t('dialog_title')}
      description={t('dialog_description')}
      {...props}
    >
      <div className={styles.languageList}>
        {LANGUAGES.map(language => (
          <button
            key={language.code}
            type='button'
            onClick={() => handleLanguageChange(language.code)}
            disabled={isPending}
            data-loading={isPending || undefined}
            data-selected={language.code === locale || undefined}
            className={styles.languageItem}
          >
            <div className={styles.languageInfo}>
              <span>{language.nativeName}</span>
            </div>
            {language.code === locale && (
              <CheckIcon className={styles.languageCheck} />
            )}
          </button>
        ))}
      </div>
    </Dialog>
  );
};
