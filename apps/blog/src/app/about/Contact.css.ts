import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: '3rem',
});

export const row = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
  fontSize: 15,
  color: themeColor.colors.subFontColor,
  marginBottom: 6,
  ':last-of-type': {
    marginBottom: 0,
  },
});

export const group = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
});

export const link = style({
  color: themeColor.colors.subFontColor,
  textDecoration: 'none',
  borderBottom: '1px solid transparent',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  ':hover': {
    color: themeColor.colors.titleFontColor,
    borderBottomColor: themeColor.colors.borderColor,
  },
});

export const dot = style({
  color: themeColor.colors.borderColor,
  userSelect: 'none',
});
