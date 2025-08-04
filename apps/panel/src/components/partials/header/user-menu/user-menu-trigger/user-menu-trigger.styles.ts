import { css } from '@/styled-system/css';

export const styles = {
  button: css({
    '&&': {
      padding: '0',
      borderRadius: 'full',
      backgroundColor: 'transparent !important',
      aspectRatio: 'square',
      inlineSize: '10',
      blockSize: '10',
      outlineColor: 'purple.900 !important'
    }
  })
};
