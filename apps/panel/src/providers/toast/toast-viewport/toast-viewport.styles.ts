import { css } from '@/styled-system/css';

export const styles = {
  viewport: css({
    position: 'fixed',
    insetBlockEnd: '0',
    insetInlineEnd: '0',
    display: 'flex',
    flexDirection: 'column',
    padding: '6',
    gap: '2',
    zIndex: 'toast',
    maxInlineSize: 'md',
    margin: '0',
    listStyle: 'none',
    outline: 'none'
  })
};
