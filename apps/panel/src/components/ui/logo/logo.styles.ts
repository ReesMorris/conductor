import { cva } from '@/styled-system/css';

export const styles = {
  logo: cva({
    base: {
      flexShrink: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: 'square',
      backgroundColor: 'glass.light',
      userSelect: 'none',
      fontWeight: 'black',
      fontSize: 'xl'
    },
    variants: {
      shape: {
        square: {
          borderRadius: '[none]'
        },
        rounded: {
          borderRadius: 'md'
        },
        circle: {
          borderRadius: 'full'
        }
      }
    },
    defaultVariants: {
      shape: 'circle'
    }
  })
};
