import { cva } from '@/styled-system/css';

export const styles = {
  button: cva({
    base: {
      blockSize: 'ui',
      borderRadius: 'md',
      textStyle: 'sm',
      fontWeight: 'medium',
      cursor: 'pointer',
      backgroundColor: 'colorPalette.background',
      color: 'colorPalette.foreground',
      transitionProperty: 'background-color, transform',
      transitionDuration: 'normal',
      transitionTimingFunction: 'ease',

      '&:not(:disabled):hover': {
        backgroundColor: 'colorPalette.background.hover'
      },

      _active: {
        transform: 'scale(0.99)'
      }
    },
    variants: {
      variant: {
        primary: {
          colorPalette: 'primary'
        },
        secondary: {},
        tertiary: {},
        ghost: {}
      }
    }
  }),
  defaultVariants: {
    variant: 'primary'
  }
};
