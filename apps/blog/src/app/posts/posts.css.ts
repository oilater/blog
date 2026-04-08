import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const container = style({
  margin: '0 auto',
  maxWidth: '750px',
  width: '100%',
});

export const tagFilter = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '2rem',
});

export const tagButton = style({
  padding: '8px 14px',
  borderRadius: 100,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 14,
  transition: 'all 0.2s ease',
});

export const tagButtonActive = style({
  backgroundColor: themeColor.colors.highLightFontColor,
  color: '#fff',
});

export const tagButtonInactive = style({
  backgroundColor: themeColor.colors.tagBackground,
  color: themeColor.colors.tagItemColor,
  ':hover': {
    backgroundColor: themeColor.colors.highLightFontColor,
    color: '#fff',
  },
});

export const postsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
});

export const postCard = style({});

export const postLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1.25rem 0',
});

export const postTagBadge = style({
  fontSize: '0.8rem',
  fontWeight: 500,
  padding: '0.2rem 0.5rem',
  backgroundColor: themeColor.colors.tagBackground,
  color: themeColor.colors.highLightFontColor,
  borderRadius: '4px',
  alignSelf: 'flex-start',
  letterSpacing: '0.02em',
});

export const postTitle = style({
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.4,
  color: themeColor.colors.titleFontColor,
  transition: 'color 0.2s ease',
  selectors: {
    [`${postLink}:hover &`]: {
      color: themeColor.colors.highLightFontColor,
    },
  },
});

export const postDate = style({
  fontSize: '0.875rem',
  color: themeColor.colors.subFontColor,
});

export const noPosts = style({
  color: themeColor.colors.subFontColor,
});
