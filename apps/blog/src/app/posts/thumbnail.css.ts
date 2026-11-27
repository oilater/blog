import { style } from '@vanilla-extract/css';

export const thumbnail = style({
  position: 'relative',
  flexShrink: 0,
  width: 72,
  height: 72,
  borderRadius: 12,
  overflow: 'hidden',
  '@media': {
    '(max-width: 640px)': {
      width: 56,
      height: 56,
      borderRadius: 10,
    },
  },
});

export const image = style({
  objectFit: 'cover',
});

export const generated = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(135deg, hsl(var(--thumb-hue) 70% 94%), hsl(calc(var(--thumb-hue) + 25) 65% 86%))',
  color: 'hsl(var(--thumb-hue) 45% 38%)',
  selectors: {
    '[data-theme="dark"] &': {
      background:
        'linear-gradient(135deg, hsl(var(--thumb-hue) 30% 20%), hsl(calc(var(--thumb-hue) + 25) 35% 14%))',
      color: 'hsl(var(--thumb-hue) 60% 78%)',
    },
  },
});

export const glyph = style({
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  '@media': {
    '(max-width: 640px)': {
      fontSize: 16,
    },
  },
});
