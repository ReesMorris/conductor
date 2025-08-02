import { css } from '@/styled-system/css';

export const styles = {
  content: css({
    zIndex: 'tooltip',
    overflow: 'hidden',
    maxInlineSize: '80',
    paddingBlock: '1.5',
    paddingInline: '2',
    color: 'foreground.subtle',
    textStyle: 'xs',
    backgroundColor: 'glass.light',
    backdropFilter: 'auto',
    backdropBlur: '2xl',
    borderRadius: 'md',
    fontSize: 'sm',
    lineHeight: 'tight',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'glass.medium',
    animationDuration: 'fast',
    animationTimingFunction: 'out',

    '&[data-state="delayed-open"]': {
      animation: 'tooltip-fade-in'
    },
    '&[data-state="closed"]': {
      animation: 'tooltip-fade-out'
    }
  })
};
