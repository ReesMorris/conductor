import { css } from '@/styled-system/css';

export const styles = {
  header: css({
    blockSize: 'header',
    position: 'fixed',
    insetBlockStart: '0',
    insetInline: '0',
    borderBlockEndWidth: '1',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'border',
    backgroundColor: 'background.secondary',
    zIndex: 'above'
  }),
  content: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    blockSize: 'full',
    paddingInline: '6'
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
    gap: '6'
  })
};
