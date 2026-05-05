import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: '3rem',
});

export const contentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const item = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 32,
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      gap: 4,
    },
  },
});

export const leftColumn = style({
  width: 200,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
    },
  },
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const dot = style({
  width: 4,
  height: 4,
  borderRadius: '50%',
  background: themeColor.colors.borderColor,
  flexShrink: 0,
});

export const title = style({
  fontSize: 16,
  fontWeight: 600,
  color: themeColor.colors.titleFontColor,
});

export const date = style({
  fontSize: 13,
  color: themeColor.colors.subFontColor,
  opacity: 0.8,
  marginLeft: 12,
});

export const rightColumn = style({
  flex: 1,
  paddingTop: 2,
});

export const issuer = style({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.6,
  color: themeColor.colors.subFontColor,
});
