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
      color: 'colorPalette.foreground',
      backgroundColor: 'colorPalette.background',
      borderBlockWidth: '1',
      borderBlockStyle: 'solid',
      borderBlockColor: 'colorPalette.border',
      textAlign: 'center',

      _icon: {
        flexShrink: '0',
        inlineSize: '3.5',
        blockSize: '3.5'
      }
    },
    variants: {
      variant: {
        info: {
          // colorPalette: 'info'
        },
        warning: {
          // colorPalette: 'warning'
        },
        error: {
          colorPalette: 'danger'
        }
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  })
};
