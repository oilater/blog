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
  width: 140,
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
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.6,
  color: themeColor.colors.subFontColor,
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

export const statusNote = style({
  marginTop: 8,
  fontSize: 14,
  color: themeColor.colors.subFontColor,
  opacity: 0.8,
  fontWeight: 400,
});
