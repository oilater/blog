import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  background: 'inherit',
  borderRadius: '8px',
});

export const cardImageWrapper = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: 0,
});

export const cardImage = style({
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  transition: 'transform 0.2s ease-out',
  ':hover': {
    transform: 'scale(1.08) translateZ(0)',
  },
});

export const cardContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  paddingTop: '10px',
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
