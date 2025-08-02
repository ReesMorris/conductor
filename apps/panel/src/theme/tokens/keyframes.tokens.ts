import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  'fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  'fade-out': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },
  'dialog-enter': {
    '0%': {
      opacity: '0',
      transform: 'translateX(-50%) translateY(10px) scale(0.96)'
    },
    '100%': {
      opacity: '1',
      transform: 'translateX(-50%) translateY(0) scale(1)'
    }
  },
  'dialog-exit': {
    '0%': {
      opacity: '1',
      transform: 'translateX(-50%) translateY(0) scale(1)'
    },
    '100%': {
      opacity: '0',
      transform: 'translateX(-50%) translateY(10px) scale(0.96)'
    }
  },
  'tooltip-fade-in': {
    '0%': {
      opacity: '0',
      transform: 'scale(0.96)'
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)'
    }
  },
  'tooltip-fade-out': {
    '0%': {
      opacity: '1',
      transform: 'scale(1)'
    },
    '100%': {
      opacity: '0',
      transform: 'scale(0.96)'
    }
  },
  enter: {
    '0%': {
      opacity: '0',
      transform: 'translate3d(0,0,0) scale3d(0.95,0.95,1) rotate(0)'
    },
    '100%': {
      opacity: '1',
      transform: 'translate3d(0,0,0) scale3d(1,1,1) rotate(0)'
    }
  },
  exit: {
    '0%': {
      opacity: '1',
      transform: 'translate3d(0,0,0) scale3d(1,1,1) rotate(0)'
    },
    '100%': {
      opacity: '0',
      transform: 'translate3d(0,0,0) scale3d(0.95,0.95,1) rotate(0)'
    }
  }
});
