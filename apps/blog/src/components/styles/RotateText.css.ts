import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const text = style({
  display: 'none',
  '@media': {
    '(min-width: 1025px)': {
      display: 'block',
    },
  },
  fontSize: '0.8rem',
  fontWeight: 400,
  color: themeColor.colors.subFontColor,
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  willChange: 'opacity, transform',
});

export const visible = style({
  opacity: 1,
  transform: 'translateY(0)',
});

export const hidden = style({
  opacity: 0,
  transform: 'translateY(-6px)',
});
