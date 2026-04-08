import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const tagHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

export const tagLink = style({
  fontSize: '0.725rem',
  padding: '0.2rem 0.5rem',
  backgroundColor: themeColor.colors.tagBackground,
  color: themeColor.colors.highLightFontColor,
  borderRadius: '0.25rem',
  textDecoration: 'none',
  transition: 'background-color 0.2s',
  ':hover': {
    opacity: 0.8,
  },
});

export const metaRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const commentsContainer = style({
  marginTop: 48,
});
