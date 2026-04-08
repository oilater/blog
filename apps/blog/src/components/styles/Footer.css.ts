import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const footer = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 36,
  backgroundColor: themeColor.colors.mainBackground,
  borderTop: `1px solid ${themeColor.colors.borderColor}`,
  transition: 'background-color 0.2s ease-out',
});

export const copyright = style({
  fontSize: '0.8rem',
  color: themeColor.colors.subFontColor,
});
