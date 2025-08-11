import type { SwitchProps } from '@/components/ui';

export interface SettingsToggleProps extends SwitchProps {
  label: string;
  description?: string;
}
