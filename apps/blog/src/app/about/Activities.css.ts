import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  marginBottom: '3rem',
});

export const contentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});

export const item = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 32,
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      gap: 12,
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

export const iconWrapper = style({
  width: 24,
  height: 24,
  borderRadius: 6,
  overflow: 'hidden',
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const icon = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const title = style({
  fontSize: 16,
  fontWeight: 600,
  color: themeColor.colors.titleFontColor,
});

export const link = style({
  fontSize: 13,
  color: themeColor.colors.subFontColor,
  textDecoration: 'underline',
  textUnderlineOffset: 2,
  marginLeft: 32,
  width: 'fit-content',
  ':hover': {
    color: themeColor.colors.titleFontColor,
  },
});

export const date = style({
  fontSize: 13,
  color: themeColor.colors.subFontColor,
  opacity: 0.8,
  marginLeft: 32,
});

export const rightColumn = style({
  flex: 1,
  paddingTop: 2,
});

export const intro = style({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.7,
  color: themeColor.colors.mainFontColor,
  marginBottom: 12,
});

export const subSection = style({
  marginBottom: 16,
  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

export const subHeading = style({
  fontSize: 15,
  fontWeight: 600,
  color: themeColor.colors.highLightFontColor,
  marginBottom: 6,
});

export const subBody = style({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.7,
  color: themeColor.colors.subFontColor,
});

export const bulletList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const bullet = style({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.7,
  color: themeColor.colors.subFontColor,
  position: 'relative',
  paddingLeft: 16,
  selectors: {
    '&::before': {
      content: '"•"',
      position: 'absolute',
      left: 0,
      color: themeColor.colors.subFontColor,
    },
  },
});
