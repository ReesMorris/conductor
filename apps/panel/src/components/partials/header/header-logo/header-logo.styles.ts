import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    inlineSize: 'sidebar',
    blockSize: 'full',
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    borderInlineEndWidth: '1',
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: 'border',
    userSelect: 'none'
  }),
  name: css({
    fontWeight: 'black',
    letterSpacing: 'tight'
  })
};
