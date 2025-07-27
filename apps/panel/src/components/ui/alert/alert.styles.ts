import { cva } from '@/styled-system/css';

export const styles = {
  alert: cva({
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2',
      paddingBlock: '2',
      paddingInline: '6',
      textStyle: 'sm',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 'md',
      textAlign: 'center',

      _icon: {
        flexShrink: '0',
        inlineSize: '3.5',
        blockSize: '3.5'
      }
    },
    variants: {
      color: {
        info: {
          // colorPalette: 'info'
        },
        warning: {
          // colorPalette: 'warning'
        },
        error: {
          colorPalette: 'danger'
        }
      },
      variant: {
        outlined: {
          color: 'colorPalette.foreground',
          borderColor: 'colorPalette.border'
        },
        solid: {
          color: 'colorPalette.foreground.onSolid',
          backgroundColor: 'colorPalette.background.solid'
        },
        subtle: {
          color: 'colorPalette.foreground.onSubtle',
          backgroundColor: 'colorPalette.background.subtle'
        }
      }
    },
    defaultVariants: {
      color: 'info',
      variant: 'outlined'
    }
  })
};
