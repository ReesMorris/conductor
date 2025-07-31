import { css } from '@/styled-system/css';

export const styles = {
  wrapper: css({
    display: 'flex',
    inlineSize: '[min(100vw, {sizes.wrapper})]',
    marginInline: 'auto',
    paddingInline: '2'
  })
};
