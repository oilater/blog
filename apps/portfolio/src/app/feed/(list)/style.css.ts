import { style } from '@vanilla-extract/css';

export const title = style({
  marginBottom: '20px',
  fontSize: '32px',
});

export const listWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const observeContainer = style({
  width: '100%',
  height: '200px',
});
