import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const section = style({
  marginBottom: '3rem',
});

export const contentList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const imagePostCard = style({
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  overflow: 'hidden',
});

export const contentLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
});

export const imageWrapper = style({
  position: 'relative',
  width: 80,
  height: 80,
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
