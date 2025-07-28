import { css } from '@/styled-system/css';

export const styles = {
  menu: css({
    inlineSize: '[16rem]'
  }),
  accountHeader: css({
    maxInlineSize: 'full',
    paddingBlock: '2',
    paddingInline: '3'
  }),
  username: css({
    fontWeight: 'medium',
    lineClamp: '1'
  }),
  email: css({
    color: 'foreground.muted',
    textStyle: 'sm',
    lineClamp: '1'
  }),
  locale: css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textStyle: 'xs',
    color: 'foreground.muted',
    backgroundColor: 'background.elevated',
    borderRadius: 'sm',
    paddingBlock: '0.5',
    paddingInline: '1',
    textTransform: 'uppercase'
  })
};
