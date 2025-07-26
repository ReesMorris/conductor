import { defineGlobalStyles } from '@pandacss/dev';

export const globalStyles = defineGlobalStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background',
    color: 'foreground',
    minBlockSize: 'dvh',
    textStyle: 'body'
  }
});
