import { defineTokens } from '@pandacss/dev';

export const animations = defineTokens.animations({
  'fade-in': {
    value: 'fade-in 200ms ease-in forwards'
  },
  'fade-out': {
    value: 'fade-out 200ms ease-in forwards'
  },
  'fade-in-smooth': {
    value: 'fade-in 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
  },
  'fade-out-smooth': {
    value: 'fade-out 200ms cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards'
  },
  'dialog-enter': {
    value: 'dialog-enter 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
  },
  'dialog-exit': {
    value: 'dialog-exit 200ms cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards'
  },
  'tooltip-fade-in': {
    value: 'tooltip-fade-in 200ms ease-out forwards'
  },
  'tooltip-fade-out': {
    value: 'tooltip-fade-out 200ms ease-out forwards'
  },
  enter: {
    value: 'enter 150ms ease-out forwards'
  },
  exit: {
    value: 'exit 150ms ease-out forwards'
  }
});
