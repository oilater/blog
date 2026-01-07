import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: '8.5rem',
  marginInline: 'auto',
  maxWidth: '960px',
  padding: '0 16px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '90vh',

  '@media': {
    '(min-width: 640px)': {
      padding: '0 24px',
    },
    '(min-width: 1280px)': {
      maxWidth: '960px',
      padding: '0',
    },
  },
});

export const postContainer = style({
  maxWidth: '768px',
  margin: '0 auto',

  '@media': {
    '(min-width: 640px)': {
      padding: '0 24px',
    },
    '(min-width: 1280px)': {
      maxWidth: '768px',
      padding: '0',
    },
  },
});
