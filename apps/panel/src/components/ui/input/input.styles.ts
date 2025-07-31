import { css } from '@/styled-system/css';

export const styles = {
  input: css({
    display: 'flex',
    inlineSize: 'full',
    borderRadius: 'md',
    blockSize: 'ui',
    paddingInline: '3',
    textStyle: 'sm',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'transparent',
    fontWeight: 'medium',
    color: 'foreground',
    backgroundColor: 'glass.light',
    backdropFilter: 'auto',
    backdropBlur: 'sm',
    transitionProperty: 'border, outline, background',
    transitionDuration: 'normal',
    transitionTimingFunction: 'in-out',

    '&:not(:disabled):hover': {
      borderColor: 'foreground/20'
    },

    _focus: {
      outlineOffset: '0',
      outlineWidth: '1',
      outlineStyle: 'solid',
      outlineColor: 'foreground/20',
      borderColor: 'foreground/20',
      backgroundColor: 'glass.medium'
    },

    _invalid: {
      borderColor: 'red.400',

      _hover: {
        borderColor: 'red.500'
      },
      _focus: {
        outlineColor: 'red.500',
        borderColor: 'red.500'
      }
    },

    _disabled: {
      cursor: 'not-allowed',
      opacity: 'disabled'
    },

    _placeholder: {
      color: 'foreground/40'
    }
  })
};
