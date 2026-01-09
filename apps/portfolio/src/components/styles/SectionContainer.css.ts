import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: '6.5rem',
  marginInline: 'auto',
  maxWidth: 900,
  padding: '0 16px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '90vh',

  '@media': {
    '(min-width: 640px)': {
      padding: '0 24px',
    },
    '(min-width: 1280px)': {
      maxWidth: 900,
      padding: 0,
    },
  },
});
