import { style } from '@vanilla-extract/css';
import { mediaQueries } from '#/tokens/config';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  paddingBottom: '6rem',
  position: 'relative',
});

export const outroSection = style({
  margin: '0 auto',
  position: 'relative',
  height: '100%',
  width: '30%',
  '@media': {
    [mediaQueries.mobile]: {
      width: '60%',
    },
  },
});

export const thankTitle = style({
  textAlign: 'center',
  marginTop: '3rem',
  padding: '0 0 32px',
  fontSize: '32px',
  color: themeColor.colors.cardTitleFontColor,
  fontWeight: '600',
});

export const contactContainer = style({
  padding: '24px',
  margin: '0 auto',
  backgroundColor: themeColor.colors.quoteBackground,
  borderRadius: '16px',
});

export const contactItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
});

export const contactLabel = style({
  fontSize: '1.1rem',
  fontWeight: '500',
  color: themeColor.colors.cardTitleFontColor,
  minWidth: '80px',
});

export const contactValue = style({
  fontSize: '1rem',
  color: themeColor.colors.cardTitleFontColor,
  wordBreak: 'break-all',
});
