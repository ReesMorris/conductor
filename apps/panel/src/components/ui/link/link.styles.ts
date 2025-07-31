import { cva } from '@/styled-system/css';

export const styles = {
  link: cva({
    base: {
      color: 'purple.400',
      cursor: 'pointer',
      fontWeight: 'medium',
      textUnderlineOffset: '5px',
      textDecorationThickness: '1px',
      textDecorationLine: 'underline',
      transitionProperty: 'color',
      transitionDuration: 'normal',

      _hover: {
        color: 'purple.300',
        textDecorationColor: 'current/95',
        textDecorationThickness: '1.5px'
      },

      _focusVisible: {
        outlineWidth: '2',
        outlineOffset: '1',
        outlineStyle: 'solid',
        outlineColor: 'purple.300'
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
