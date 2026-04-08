import { style } from '@vanilla-extract/css';

export const container = style({
  marginTop: 78,
  paddingBottom: 60,
  padding: '0 20px 60px',

  '@media': {
    '(min-width: 1280px)': {
      padding: '0 0 60px',
    },
  },
});
