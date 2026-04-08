import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  paddingTop: 48,
  paddingBottom: 48,
  marginTop: 80,
  borderTop: `1px solid ${themeColor.colors.borderColor}`,
});

export const socialRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
});

export const copyright = style({
  fontSize: '0.8rem',
  color: themeColor.colors.subFontColor,
});
