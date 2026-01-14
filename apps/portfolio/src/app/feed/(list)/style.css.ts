import { style } from '@vanilla-extract/css';

export const title = style({
  marginBottom: 40,
  fontSize: 32,
});

export const listWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const observeContainer = style({
  width: '100%',
  height: 200,
});
