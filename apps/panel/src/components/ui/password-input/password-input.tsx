'use client';

import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IconButton } from '../icon-button';
import { Input } from '../input';
import { InputGroup } from '../input-group';
import type { PasswordInputProps } from './password-input.types';

export const PasswordInput: React.FC<PasswordInputProps> = ({
  elementStart = <LockIcon />,
  showPasswordLabel,
  hidePasswordLabel,
  type,
  ...props
}) => {
  const t = useTranslations('password_input');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const ariaLabel = showPassword
    ? hidePasswordLabel || t('hide_password')
    : showPasswordLabel || t('show_password');

  const placeholder = showPassword
    ? t('placeholder').toLowerCase()
    : '••••••••••';

  return (
    <InputGroup
      startElement={elementStart}
      endElement={
        <IconButton
          variant='ghost'
          size='sm'
          aria-label={ariaLabel}
          onClick={togglePasswordVisibility}
          type='button'
          tabIndex={-1}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </IconButton>
      }
    >
      <Input
        placeholder={placeholder}
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
    </InputGroup>
  );
};
