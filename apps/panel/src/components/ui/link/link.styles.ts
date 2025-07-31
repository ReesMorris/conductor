import { cva } from '@/styled-system/css';

export const styles = {
  link: cva({
    base: {
      color: 'purple.900',
      cursor: 'pointer',
      fontWeight: 'medium',
      textUnderlineOffset: '5px',
      textDecorationThickness: '1px',
      textDecorationLine: 'underline',
      transitionProperty: 'opacity',
      transitionDuration: 'normal',

      _hover: {
        opacity: '0.85',
        textDecorationColor: 'current/95',
        textDecorationThickness: '1.5px'
      },

      _focusVisible: {
        outlineWidth: '2',
        outlineOffset: '1',
        outlineStyle: 'solid',
        outlineColor: 'purple.900'
      }
    },
    variants: {
      underlined: {
        true: {},
        false: {
          textDecorationColor: 'transparent',
          _hover: {
            textDecorationColor: 'transparent'
          }
        }
      }
    },
    defaultVariants: {
      underlined: false
    }
  })
};
