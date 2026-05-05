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

export const role = style({
  fontSize: 14,
  fontWeight: 400,
  color: themeColor.colors.subFontColor,
  marginLeft: 32,
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
  color: themeColor.colors.mainFontColor,
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

export const intro = style({
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.7,
  color: themeColor.colors.mainFontColor,
  marginBottom: 16,
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

export const statusNote = style({
  marginTop: 12,
  fontSize: 14,
  color: themeColor.colors.subFontColor,
  opacity: 0.8,
  fontWeight: 400,
});

export const imagePostCard = style({
  border: `1px solid ${themeColor.colors.borderColor}`,
  borderRadius: '0.5rem',
  overflow: 'hidden',
  marginTop: 20,
  maxWidth: 500,
  transition: 'transform 0.2s ease-in-out',
  ':hover': {
    transform: 'translateY(-2px)',
  },
});

export const contentLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
});

export const imageWrapper = style({
  position: 'relative',
  width: 100,
  height: 100,
  flexShrink: 0,
});

export const image = style({
  objectFit: 'cover',
});

export const contentInfo = style({
  padding: '1rem',
  flex: 1,
});

export const contentTitle = style({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: themeColor.colors.titleFontColor,
  marginBottom: '0.5rem',
  selectors: {
    [`${contentLink}:hover &`]: {
      color: themeColor.colors.highLightFontColor,
      transition: 'color 0.2s ease-in-out',
    },
  },
});

export const contentDescription = style({
  fontSize: '0.875rem',
  color: themeColor.colors.subFontColor,
});
