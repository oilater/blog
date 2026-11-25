import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const nav = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
  marginTop: 64,
  '@media': {
    '(max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '16px 20px',
  borderRadius: 12,
  border: `1px solid ${themeColor.colors.borderColor}`,
  textDecoration: 'none',
  transition: 'border-color 0.15s ease',
  ':hover': {
    borderColor: themeColor.colors.highLightFontColor,
  },
});

export const cardNext = style({
  textAlign: 'right',
  gridColumn: 2,
  '@media': {
    '(max-width: 600px)': {
      gridColumn: 1,
    },
  },
});

export const label = style({
  fontSize: 13,
  color: themeColor.colors.cardDescriptionFontColor,
});

export const title = style({
  fontSize: 15,
  lineHeight: 1.4,
  color: themeColor.colors.titleFontColor,
  wordBreak: 'keep-all',
  selectors: {
    [`${card}:hover &`]: {
      color: themeColor.colors.highLightFontColor,
    },
  },
});
