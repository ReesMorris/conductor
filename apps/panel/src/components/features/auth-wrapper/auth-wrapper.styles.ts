import { css } from '@/styled-system/css';

export const styles = {
  debugContainer: css({
    position: 'relative'
  }),
  debugOverlay: css({
    position: 'absolute',
    insetBlockStart: '0',
    insetInlineStart: '0',
    zIndex: 'above'
  })
};
