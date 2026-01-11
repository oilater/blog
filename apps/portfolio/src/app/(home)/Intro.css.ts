import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const title = style({
  textAlign: 'center',
  color: vars.themeColor.colors.titleFontColor,
  letterSpacing: '-0.01em',
  fontSize: 40,
});
