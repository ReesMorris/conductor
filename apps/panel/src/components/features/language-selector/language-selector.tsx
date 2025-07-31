'use client';

import { DropdownMenu } from '@/components/ui';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { LANGUAGES } from './language-selector.constants';
import type { LanguageSelectorProps } from './language-selector.types';
import { LanguageSelectorTrigger } from './language-selector-trigger';

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  trigger,
  triggerAsChild = true,
  ...props
}) => {
  const t = useTranslations('language_selector');
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(
      { pathname },
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { locale: newLocale }
    );
  };

  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      triggerAsChild={triggerAsChild}
      trigger={trigger ?? <LanguageSelectorTrigger isOpen={isOpen} />}
      aria-label={t('label')}
      sideOffset={10}
      align='end'
      {...props}
    >
      {LANGUAGES.map(language => (
        <DropdownMenu.Item
          key={language.code}
          onSelect={() => handleLanguageChange(language.code)}
          aria-current={locale === language.code}
        >
          {language.nativeName}
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Root>
  );
};
