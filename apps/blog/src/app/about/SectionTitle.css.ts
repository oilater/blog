import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const sectionTitle = style({
  fontSize: 20,
  fontWeight: 500,
  color: themeColor.colors.titleFontColor,
  marginBottom: 20,
});
