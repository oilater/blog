import { style } from '@vanilla-extract/css';

export const wrapper = style({
  margin: '0 auto',
  maxWidth: '768px',
  minHeight: '100vh',
  width: '100%',
});

export const title = style({
  marginBottom: '20px',
  fontSize: '32px',
});

export const listWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
