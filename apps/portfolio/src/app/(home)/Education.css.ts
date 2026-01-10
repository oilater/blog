import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  paddingBottom: '6rem',
  position: 'relative',
  overflow: 'hidden',
});

export const contentSection = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const mainDescription = style({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: vars.themeColor.colors.contentFontColor,
  marginBottom: '2.5rem',
});

export const hr = style({
  border: 'none',
  height: 2,
  background: 'rgba(222, 222, 255, 0.19)',
});

export const educationItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  marginBottom: '3rem',
});
export const educationContent = style({
  flex: 1,
});

export const educationHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 4,
});

export const educationPeriod = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 12,
  minWidth: 140,
  paddingTop: 4,
  fontSize: '16px',
  fontWeight: 500,
  color: vars.colors.grey500,
});

export const educationTitle = style({
  fontSize: 20,
  fontWeight: 600,
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const educationDescription = style({
  marginTop: 10,
  fontSize: 16,
  lineHeight: 1.65,
  color: vars.themeColor.colors.subFontColor,
});

export const dot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: vars.themeColor.colors.borderColor,
  flexShrink: 0,
});
