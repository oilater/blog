import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

const pulse = keyframes({
  '0% 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

export const wrapper = style({
  margin: '0 auto',
  maxWidth: '768px',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const title = style({
  width: '80%',
  height: '60px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '8px',
  marginBottom: '10px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const description = style({
  width: '100px',
  height: '20px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const author = style({
  width: '100%',
  height: '24px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const tags = style({
  display: 'flex',
  gap: '8px',
  marginBottom: '6px',
});

export const tag = style({
  height: '32px',
  width: '75px',
  marginBottom: 6,
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '16px',
  animation: `${pulse} 2s ease-in-out infinite`,
});

export const bodyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  justifyContent: 'space-between',
  marginBottom: 20,
});

export const bodyLine = style({
  height: 20,
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  animation: `${pulse} 1s ease-in-out infinite`,
});

export const bodyLineFull = style({ width: '93%' });
export const bodyLineMedium = style({ width: '95%' });
export const bodyLineShort = style({ width: '90%' });
