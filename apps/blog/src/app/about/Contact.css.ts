import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: '3rem',
});

export const contactContainer = style({
  padding: '16px 24px',
  backgroundColor: themeColor.colors.cardBackground,
  borderRadius: 12,
});

export const contactItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
});

export const contactLabel = style({
  fontSize: 14,
  fontWeight: 500,
  color: themeColor.colors.cardTitleFontColor,
  minWidth: '80px',
});

export const contactValue = style({
  fontSize: 14,
  color: themeColor.colors.cardTitleFontColor,
  wordBreak: 'break-all',
});
