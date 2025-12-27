import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/global.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  verticalAlign: 'top',
  background: 'inherit',
  border: `1px solid ${vars.themeColor.colors.borderColor}`,
  borderRadius: '16px',
  transition: 'background 0.2s ease',
  cursor: 'pointer',
  ':hover': {
    background: vars.themeColor.colors.cardBackground,
  },
});

export const cardImageWrapper = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1',
  borderRadius: '16px 16px 0 0',
  overflow: 'hidden',
  padding: 0,
  '@media': {
    '(min-width: 1024px)': {
      maxHeight: '260px',
    },
  },
});

export const cardImage = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  transition: 'transform 0.2s ease-out',
  transform: 'translateZ(0)',
  ':hover': {
    transform: 'scale(1.08)',
  },
});

export const cardContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: '24px',
});

export const cardTitle = style({
  fontSize: '20px',
  fontWeight: '600',
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const cardDescription = style({
  fontSize: '15px',
  fontWeight: '400',
  color: vars.themeColor.colors.cardDescriptionFontColor,
});

export const cardTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginTop: '8px',
});
