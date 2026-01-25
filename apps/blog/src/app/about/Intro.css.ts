import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: 30,
});

export const description = style({
  color: themeColor.colors.mainFontColor,
  fontSize: 16,
  marginTop: 8,
});
