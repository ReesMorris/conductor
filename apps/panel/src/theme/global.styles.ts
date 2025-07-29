import { defineGlobalStyles } from '@pandacss/dev';

export const globalStyles = defineGlobalStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    // TODO: Move into theme
    background: `
      radial-gradient(circle at center, rgba(120,119,198,0.1) 0%, transparent 70%),
      linear-gradient(to bottom right, #0f0f23, #1a1a2e)
    `,
    color: 'foreground',
    minBlockSize: 'dvh',
    textStyle: 'body'
  }
});
