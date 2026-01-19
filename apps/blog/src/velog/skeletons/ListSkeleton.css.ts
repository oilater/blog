import { keyframes, style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

const pulse = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.4,
  },
});

const animation = `${pulse} 0.8s ease-in-out infinite`;

export const wrapper = style({
  marginTop: 50,
  marginBottom: 90,
  maxWidth: 768,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const blogList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

export const card = style({
  cursor: 'default',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: `0.2px solid ${themeColor.colors.skeletonColor}`,
});

export const cardTitle = style({
  marginTop: '4px',
  width: '48%',
  height: '28px',
  backgroundColor: themeColor.colors.skeletonColor,
  borderRadius: 8,
  animation: animation,
  marginBottom: 36,
});

export const descContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  justifyContent: 'space-between',
});

export const descLine = style({
  height: 16,
  backgroundColor: themeColor.colors.skeletonColor,
  borderRadius: 6,
  animation: animation,
});

export const descLineFull = style({ width: '93%' });
export const descLineMedium = style({ width: '95%' });
export const descLineShort = style({ width: '90%' });

export const tagContainer = style({
  display: 'flex',
  gap: 8,
});

export const tag = style({
  height: 28,
  width: 62,
  backgroundColor: themeColor.colors.skeletonColor,
  borderRadius: 16,
  animation: animation,
});

export const cardDate = style({
  height: 18,
  width: 40,
  marginTop: 32,
  backgroundColor: themeColor.colors.skeletonColor,
  borderRadius: 6,
  animation: animation,
});
