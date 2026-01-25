import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: 100,
  padding: '0 20px',

  '@media': {
    '(min-width: 1280px)': {
      padding: 0,
    },
  },
});
