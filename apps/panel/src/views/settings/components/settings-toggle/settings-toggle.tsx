'use client';

import { Label, Switch } from '@/components/ui';
import { useId } from 'react';
import { styles } from './settings-toggle.styles';
import type { SettingsToggleProps } from './settings-toggle.types';

export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  label,
  description,
  ...props
}) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <div>
        <Label htmlFor={id}>{label}</Label>
        <div className={styles.description}>{description}</div>
      </div>
      <Switch {...props} />
    </div>
  );
};
