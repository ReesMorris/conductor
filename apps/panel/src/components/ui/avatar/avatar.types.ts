import type { Avatar as RadixAvatar } from 'radix-ui';
import type { styles } from './avatar.styles';

export type AvatarSize = (typeof styles.variantMap.size)[number];
export type AvatarShape = (typeof styles.variantMap.shape)[number];

export interface AvatarProps extends RadixAvatar.AvatarProps {
  /**
   * The image source URL
   */
  src?: string | null;

  /**
   * Alternative text for the image
   */
  alt?: string;

  /**
   * Content to display when the image fails to load or while loading
   * Typically initials or an icon
   */
  fallback?: React.ReactNode;

  /**
   * The size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * The shape of the avatar
   * @default 'circle'
   */
  shape?: AvatarShape;
}
