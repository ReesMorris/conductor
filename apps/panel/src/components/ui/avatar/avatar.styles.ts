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
      backgroundColor: 'primary',
      color: 'primary.contrast',
      fontWeight: 'medium',

      _icon: {
        inlineSize: '[1.6em]',
        blockSize: '[1.6em]'
      }
    }
  },
  variants: {
    size: {
      xs: {
        root: {
          inlineSize: '6',
          blockSize: '6',
          textStyle: 'xs'
        }
      },
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
      },
      '2xl': {
        root: {
          inlineSize: '20',
          blockSize: '20',
          textStyle: 'xl'
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
