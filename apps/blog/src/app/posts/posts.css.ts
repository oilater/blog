import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const container = style({
  margin: '0 auto',
  maxWidth: '820px',
  width: '100%',
});

export const tagFilter = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '2rem',
});

export const tagButton = style({
  padding: '6px 12px',
  borderRadius: 16,
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 13,
  fontWeight: 500,
  transition: 'all 0.15s ease',
});

export const tagButtonActive = style({
  backgroundColor: themeColor.colors.highLightFontColor,
  color: '#fff',
});

export const tagButtonInactive = style({
  backgroundColor: 'transparent',
  color: themeColor.colors.subFontColor,
  borderColor: themeColor.colors.borderColor,
  ':hover': {
    color: themeColor.colors.titleFontColor,
    borderColor: themeColor.colors.highLightFontColor,
  },
});

export const tagSeparator = style({
  color: themeColor.colors.borderColor,
  fontSize: 15,
  alignSelf: 'center',
  padding: '0 2px',
  userSelect: 'none',
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
  transformOrigin: 'left center',
  transition: 'transform 0.15s ease',
  ':active': {
    transform: 'scale(0.98)',
  },
});

export const postTagBadge = style({
  fontSize: '0.6875rem',
  fontWeight: 400,
  padding: '0.125rem 0.375rem',
  backgroundColor: themeColor.colors.tagBackground,
  color: themeColor.colors.highLightFontColor,
  borderRadius: '4px',
  alignSelf: 'flex-start',
  letterSpacing: '0.02em',
});

export const postTitle = style({
  fontSize: 17,
  fontWeight: 400,
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
  fontSize: '0.8125rem',
  color: themeColor.colors.subFontColor,
});

export const noPosts = style({
  color: themeColor.colors.subFontColor,
});
