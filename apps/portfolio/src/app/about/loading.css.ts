import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.4 },
});

export const wrapper = style({
  maxWidth: '64rem',
  margin: '10px auto',
  width: '100%',
  minHeight: '100vh',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '4rem',
  gap: '1rem',
});

export const title = style({
  width: 250,
  height: '3.5rem',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '8px',
  animation: `${pulse} 0.6s ease-in-out infinite`,
});

export const subtitle = style({
  width: '80%',
  maxWidth: 440,
  height: '1.5rem',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  animation: `${pulse} 0.6s ease-in-out infinite`,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
});

export const section = style({
  padding: '2rem 0',
});

export const sectionTitle = style({
  width: '200px',
  height: '2rem',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  marginBottom: '1.5rem',
  animation: `${pulse} 0.6s ease-in-out infinite`,
});

export const bodyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const bodyLine = style({
  height: '1rem',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '4px',
  animation: `${pulse} 0.6s ease-in-out infinite`,
});

export const bodyLineFull = style({ width: '100%' });
export const bodyLineMedium = style({ width: '95%' });
export const bodyLineShort = style({ width: '60%' });
