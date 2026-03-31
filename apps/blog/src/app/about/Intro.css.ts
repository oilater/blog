import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  marginBottom: 50,
});

export const photoWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 24,
});

export const profileImage = style({
  width: 180,
  height: 'auto',
  borderRadius: 12,
  backgroundColor: '#f0f0f0',
});

export const textSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 16,
});

export const listSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
});

export const emphasis = style({
  fontWeight: 500,
});
