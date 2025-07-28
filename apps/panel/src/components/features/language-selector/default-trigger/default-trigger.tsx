import { LanguagesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const DefaultTrigger: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => {
  const t = useTranslations('language_selector');

  return (
    <button type='button' aria-label={t('label')} {...props}>
      <LanguagesIcon />
    </button>
  );
};
