import { css } from '@/styled-system/css';

export const styles = {
  iconButton: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 'square',
    padding: '0',

    _icon: {
      inlineSize: '[55%]',
      blockSize: '[55%]'
    }
  })
};
