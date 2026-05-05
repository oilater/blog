import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const sectionTitle = style({
  fontSize: 26,
  fontWeight: 700,
  color: themeColor.colors.titleFontColor,
  marginBottom: 24,
  paddingBottom: 12,
  borderBottom: `1px solid ${themeColor.colors.borderColor}`,
  letterSpacing: '-0.02em',
});
