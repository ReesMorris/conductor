import { css } from '@/styled-system/css';

export const styles = {
  input: css({
    display: 'flex',
    inlineSize: 'full',
    borderRadius: 'md',
    blockSize: 'ui.md',
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
      borderColor: 'glass.dark'
    },

    _focus: {
      outlineOffset: '0',
      outlineWidth: '1',
      outlineStyle: 'solid',
      outlineColor: 'glass.dark',
      borderColor: 'glass.dark',
      backgroundColor: 'glass.medium'
    },

    _invalid: {
      borderColor: 'red.600',

      _hover: {
        borderColor: 'red.800'
      },
      _focus: {
        outlineColor: 'red.800',
        borderColor: 'red.800'
      }
    },

    _disabled: {
      cursor: 'not-allowed',
      opacity: 'disabled'
    },

    _placeholder: {
      color: 'foreground/40'
    },

    '&[data-has-start-element]': {
      paddingInlineStart: '10'
    },
    '&[data-has-end-element]': {
      paddingInlineEnd: '10'
    }
  })
};
