'use client';

import { useFormatMessage } from '@/i18n/format-message';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
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
  const { formatMessage } = useFormatMessage();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const ariaLabel = showPassword
    ? hidePasswordLabel || formatMessage('Hide Password')
    : showPasswordLabel || formatMessage('Show Password');

  const placeholder = showPassword
    ? formatMessage('Password').toLowerCase()
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
