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
});

export const tagButtonActive = style({
  backgroundColor: '#ede9fe',
  color: '#7c3aed',
});

export const tagButtonInactive = style({
  backgroundColor: '#e5e7eb',
  color: '#1f2937',
  opacity: 0.7,
  transition: 'opacity 0.1s ease-in',
  ':hover': {
    opacity: 1,
  },
});

export const postsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const postCard = style({
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
});

export const postLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  padding: '1.5rem',
});

export const postHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

export const postTitle = style({
  fontSize: 18,
  fontWeight: 600,
  color: themeColor.colors.titleFontColor,
  selectors: {
    [`${postLink}:hover &`]: {
      color: themeColor.colors.highLightFontColor,
      transition: 'color 0.2s ease-in-out',
    },
  },
});

export const postTagBadge = style({
  fontSize: '0.725rem',
  padding: '0.2rem 0.3rem',
  backgroundColor: '#ede9fe',
  color: '#7c3aed',
  borderRadius: '0.25rem',
});

export const postDate = style({
  fontSize: '0.875rem',
  paddingRight: 8,
  color: themeColor.colors.subFontColor,
});

export const noPosts = style({
  color: '#6b7280',
});
