import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/global.css';

const pulse = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});

export const wrapper = style({
  marginTop: '50px',
  marginBottom: '90px',
  maxWidth: '768px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const blogList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});

export const card = style({
  cursor: 'default',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: `0.2px solid ${vars.themeColor.colors.skeletonColor}`,
});

export const cardTitle = style({
  marginTop: '4px',
  width: '48%',
  height: '28px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '8px',
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  marginBottom: '36px',
});

export const descContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  justifyContent: 'space-between',
});

export const descLine = style({
  height: '16px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const descLineFull = style({ width: '93%' });
export const descLineMedium = style({ width: '95%' });
export const descLineShort = style({ width: '90%' });

export const tagContainer = style({
  display: 'flex',
  gap: '8px',
});

export const tag = style({
  height: '28px',
  width: '62px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '16px',
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const cardDate = style({
  height: '18px',
  width: '40px',
  marginTop: '32px',
  backgroundColor: vars.themeColor.colors.skeletonColor,
  borderRadius: '6px',
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});
