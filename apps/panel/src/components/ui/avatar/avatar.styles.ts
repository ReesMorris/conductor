import { sva } from '@/styled-system/css';

export const styles = sva({
  slots: ['root', 'image', 'fallback'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      overflow: 'hidden',
      userSelect: 'none',
      flexShrink: '0'
    },
    image: {
      inlineSize: 'full',
      blockSize: 'full',
      objectFit: 'cover'
    },
    fallback: {
      inlineSize: 'full',
      blockSize: 'full',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'background.elevated',
      color: 'foreground.muted',
      fontWeight: 'medium',

      _icon: {
        transform: 'scale(0.75)'
      }
    }
  },
  variants: {
    size: {
      sm: {
        root: {
          inlineSize: '8',
          blockSize: '8',
          textStyle: 'xs'
        }
      },
      md: {
        root: {
          inlineSize: '10',
          blockSize: '10',
          textStyle: 'sm'
        }
      },
      lg: {
        root: {
          inlineSize: '12',
          blockSize: '12',
          textStyle: 'md'
        }
      },
      xl: {
        root: {
          inlineSize: '16',
          blockSize: '16',
          textStyle: 'lg'
        }
      }
    },
    shape: {
      circle: {
        root: {
          borderRadius: 'full'
        }
      },
      square: {
        root: {
          borderRadius: 'md'
        }
      }
    }
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle'
  }
});
