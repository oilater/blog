import { style } from '@vanilla-extract/css';
import { mediaQueries, vars } from '#tokens/theme.css';

export const wideCard = style({
  display: 'flex',
  width: '100%',
  height: 'auto',
  background: 'inherit',
  cursor: 'pointer',
  '@media': {
    [mediaQueries.mobile]: {
      flexDirection: 'column',
    },
  },
});

export const cardImageWrapper = style({
  position: 'relative',
  flex: '0 0 60%',
  aspectRatio: '7/5',
  borderRadius: '16px',
  overflow: 'hidden',
});

export const cardImage = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
  transition: 'transform 0.2s ease-out',
  selectors: {
    [`${wideCard}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const cardContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 20,
  padding: 40,
  boxSizing: 'border-box',
  '@media': {
    [mediaQueries.mobile]: {
      justifyContent: 'flex-start',
      padding: 24,
      gap: 16,
    },
  },
});

export const categoryText = style({
  fontSize: '20px',
  fontWeight: '500',
  color: vars.themeColor.colors.contentFontColor,
  margin: 0,
  lineHeight: 1.2,
  transition: 'color 0.2s ease',
  '@media': {
    [mediaQueries.mobile]: {
      fontSize: '18px',
    },
  },
});

export const cardTitle = style({
  fontSize: '26px',
  fontWeight: '600',
  color: vars.themeColor.colors.mainFontColor,
  margin: 0,
  lineHeight: 1.3,
  transition: 'color 0.2s ease',
  '@media': {
    [mediaQueries.mobile]: {
      fontSize: '1.5rem',
    },
  },
  selectors: {
    [`${wideCard}:hover &`]: {
      color: vars.themeColor.colors.highLightFontColor,
    },
  },
});

export const cardDescription = style({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: vars.themeColor.colors.contentFontColor,
  margin: 0,
  lineHeight: 1.6,
  transition: 'color 0.2s ease',
  '@media': {
    [mediaQueries.mobile]: {
      fontSize: '1rem',
    },
  },
});
