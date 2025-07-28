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
  })
};
