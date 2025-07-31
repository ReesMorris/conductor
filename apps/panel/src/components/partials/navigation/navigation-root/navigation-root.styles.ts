import { css } from '@/styled-system/css';

export const styles = {
  container: css({
    display: 'flex',
    blockSize: 'navigation',
    backgroundColor: 'glass.light',
    borderBlockEndWidth: '1',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'glass.medium'
  }),
  navigation: css({
    display: 'flex'
  })
};
