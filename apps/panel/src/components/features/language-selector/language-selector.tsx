'use client';

import { DropdownMenu } from '@/components/ui';
import { useFormatMessage } from '@/i18n/format-message';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { LANGUAGES } from './language-selector.constants';
import type { LanguageSelectorProps } from './language-selector.types';
import { LanguageSelectorTrigger } from './language-selector-trigger';

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  trigger,
  triggerAsChild = true,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Function to handle language change
  const handleLanguageChange = (newLocale: string) => {
    router.replace({ pathname }, { locale: newLocale });
  };

  // Find the current language name based on the locale
  const currentLanguageName = LANGUAGES.find(language => {
    return language.code === locale;
  })?.nativeName;

  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      triggerAsChild={triggerAsChild}
      trigger={
        trigger ?? (
          <LanguageSelectorTrigger
            isOpen={isOpen}
            currentLanguageName={currentLanguageName}
          />
        )
      }
      aria-label={formatMessage('Change language')}
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
