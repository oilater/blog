import { style, keyframes } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(12px) scale(0.98)' },
  to: { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const toast = style({
  position: 'fixed',
  bottom: '64px',
  right: '40px',
  zIndex: 30,
  display: 'none',
  '@media': {
    '(min-width: 1025px)': {
      display: 'flex',
    },
  },
  alignItems: 'center',
  gap: '10px',
  padding: '12px 20px',
  borderRadius: '12px',
  backgroundColor: themeColor.colors.cardBackground,
  color: themeColor.colors.mainFontColor,
  fontSize: '0.9rem',
  fontWeight: 500,
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  border: `1px solid ${themeColor.colors.borderColor}`,
  backdropFilter: 'blur(12px)',
  animation: `${slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
  transition: 'opacity 0.3s ease, transform 0.3s ease',
});

export const toastFadeOut = style({
  opacity: 0,
  transform: 'translateY(8px) scale(0.98)',
  pointerEvents: 'none',
});

export const message = style({
  lineHeight: 1.5,
});

export const link = style({
  color: themeColor.colors.highLightFontColor,
  cursor: 'pointer',
  textDecoration: 'none',
  ':hover': {
    opacity: 0.8,
  },
});
