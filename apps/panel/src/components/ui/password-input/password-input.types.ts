import type { InputProps } from '../input/input.types';

export interface PasswordInputProps extends InputProps {
  /**
   * Icon to display at the start of the password input
   * @default LockIcon from lucide-react
   */
  elementStart?: React.ReactNode;

  /**
   * Aria label for the show password button
   * @default Uses translation key 'common.show_password'
   */
  showPasswordLabel?: string;

  /**
   * Aria label for the hide password button
   * @default Uses translation key 'common.hide_password'
   */
  hidePasswordLabel?: string;
}
