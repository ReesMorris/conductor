import { defineGlobalStyles } from '@pandacss/dev';

export const globalStyles = defineGlobalStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    background:
      'linear-gradient(to bottom right,{colors.background.from}, {colors.background.via}, {colors.background.to})',
    color: 'foreground',
    minBlockSize: 'dvh',
    textStyle: 'body'
  }
});
