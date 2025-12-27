import { globalStyle, style } from '@vanilla-extract/css';
import { mediaQueries } from '../../../styles/breakpoints.css';
import { vars } from '../../../styles/global.css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  paddingBottom: '6rem',
});

export const contentSection = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '54px 0',
  willChange: 'transform, opacity',
});

globalStyle(`${contentSection} > *`, {
  '@media': {
    [mediaQueries.desktop]: {
      flexBasis: 'calc((100% - 40px) / 3)',
      maxWidth: 'calc((100% - 40px) / 3)',
      height: '480px',
      marginRight: '20px',
    },
    [mediaQueries.mobile]: {
      width: '100%',
      marginRight: '0',
    },
  },
});

globalStyle(`${contentSection} > *:nth-of-type(3n)`, {
  '@media': {
    [mediaQueries.desktop]: {
      marginRight: '0',
    },
  },
});

export const workSection = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '54px 16px',
});

export const mainDescription = style({
  fontSize: '18px',
  fontWeight: '400',
  color: vars.themeColor.colors.contentFontColor,
  lineHeight: '1.65',
  marginBottom: '3.5rem',
});

export const hr = style({
  border: '0',
  height: '2px',
  background: 'rgba(222, 222, 255, 0.19)',
});
