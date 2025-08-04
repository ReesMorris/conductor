'use client';

import { Heading } from '@/components/ui';
import { useId } from 'react';
import type { SettingsSectionProps } from './settings-section.types';

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  label,
  children,
  ...props
}) => {
  const id = useId();

  return (
    <section aria-labelledby={id} {...props}>
      <Heading id={id} level={2}>
        {label}
      </Heading>
      {children}
    </section>
  );
};
