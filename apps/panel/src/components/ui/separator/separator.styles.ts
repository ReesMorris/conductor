import { css } from '@/styled-system/css';

export const styles = {
  separator: css({
    borderBlockStartWidth: '1',
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: 'foreground/10',

    '&:not(:first-child)': {
      marginBlockStart: '12'
    },
    '&:not(:last-child)': {
      marginBlockEnd: '12'
    }
  })
};
