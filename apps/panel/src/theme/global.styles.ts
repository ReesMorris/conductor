import { defineGlobalStyles } from '@pandacss/dev';

export const globalStyles = defineGlobalStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    background:
      'linear-gradient(to right bottom, {colors.background.gradient.from}, {colors.background.gradient.to}, {colors.background.gradient.from})',
    color: 'foreground',
    minBlockSize: 'dvh',
    textStyle: 'body'
  }
});
