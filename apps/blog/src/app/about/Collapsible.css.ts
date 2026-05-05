import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  marginTop: 12,
  marginLeft: 16,
});

export const toggle = style({
  background: 'transparent',
  border: 'none',
  color: themeColor.colors.highLightFontColor,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  padding: '4px 0',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  borderRadius: 4,
  transition: 'opacity 0.15s ease',
  ':hover': {
    opacity: 0.75,
  },
});

export const chevron = style({
  display: 'inline-block',
  transition: 'transform 0.25s ease',
  transform: 'rotate(0deg)',
});

export const chevronOpen = style({
  display: 'inline-block',
  transition: 'transform 0.25s ease',
  transform: 'rotate(180deg)',
});

const contentBase = {
  display: 'grid',
  transition: 'grid-template-rows 0.3s ease, margin-top 0.3s ease',
} as const;

export const content = style({
  ...contentBase,
  gridTemplateRows: '0fr',
  marginTop: 0,
});

export const contentOpen = style({
  ...contentBase,
  gridTemplateRows: '1fr',
  marginTop: 8,
});

export const contentInner = style({
  overflow: 'hidden',
  minHeight: 0,
});
