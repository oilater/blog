import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const paragraph = style({
  color: themeColor.colors.mainFontColor,
  fontSize: 16,
  lineHeight: 1.6,
});
