import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const track = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 3,
  zIndex: 11,
  pointerEvents: 'none',
});

export const bar = style({
  height: '100%',
  backgroundColor: themeColor.colors.highLightFontColor,
  transform: 'scaleX(0)',
  transformOrigin: '0 50%',
  willChange: 'transform',
});

export const badge = style({
  position: 'fixed',
  right: 20,
  bottom: 20,
  zIndex: 11,
  padding: '0.35rem 0.7rem',
  borderRadius: 999,
  border: `1px solid ${themeColor.colors.borderColor}`,
  backgroundColor: themeColor.colors.cardBackground,
  color: themeColor.colors.cardDescriptionFontColor,
  fontSize: '0.8rem',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  pointerEvents: 'none',
  opacity: 0,
  transform: 'translateY(8px)',
  transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const badgeVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
});
