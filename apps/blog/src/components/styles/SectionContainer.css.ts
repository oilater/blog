import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: 78,
  padding: '0 20px 0',

  '@media': {
    '(min-width: 1280px)': {
      padding: 0,
    },
  },
});
