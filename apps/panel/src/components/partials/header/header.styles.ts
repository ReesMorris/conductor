import { css } from '@/styled-system/css';

export const styles = {
  header: css({
    blockSize: 'header',
    backgroundColor: 'glass.light',
    borderBlockEndWidth: '1',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'glass.medium'
  }),
  content: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    inlineSize: 'full',
    blockSize: 'full',
    paddingInline: 'header'
  }),
  left: css({
    blockSize: 'full',
    display: 'flex',
    alignItems: 'center',
    gap: '6'
  }),
  right: css({
    blockSize: 'full',
    display: 'flex',
    alignItems: 'center',
    gap: '4'
  })
};
