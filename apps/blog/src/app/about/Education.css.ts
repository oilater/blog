import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: '3rem',
});

export const contentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

export const educationItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
});

export const dateWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 100,
  flexShrink: 0,
});

export const date = style({
  fontSize: 16,
  color: themeColor.colors.subFontColor,
});

export const dot = style({
  width: 4,
  height: 4,
  borderRadius: '50%',
  background: themeColor.colors.borderColor,
  flexShrink: 0,
});

export const educationContent = style({
  flex: 1,
});

export const educationTitle = style({
  fontSize: 16,
  fontWeight: 500,
  color: themeColor.colors.titleFontColor,
});

export const educationDescription = style({
  marginTop: 6,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.6,
  color: themeColor.colors.subFontColor,
});
