import { style } from '@vanilla-extract/css';
import { mediaQueries, vars } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  height: '20vh',
});

export const titleSection = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const title = style({
  position: 'absolute',
  maxWidth: '1000px',
  width: '100vw',
  textAlign: 'center',
  color: vars.themeColor.colors.titleFontColor,
  whiteSpace: 'pre-line',
  wordBreak: 'break-all',
  letterSpacing: '-0.01em',
  lineHeight: '1.3',
  fontSize: '42px',
  '@media': {
    '(max-width: 480px)': {
      fontSize: '1.2rem',
      width: '95vw',
      maxWidth: '350px',
    },
    [mediaQueries.mobile]: {
      fontSize: '2.5rem',
      width: '90vw',
      maxWidth: '500px',
    },
    [mediaQueries.tablet]: {
      fontSize: '2.5rem',
      width: '85vw',
      maxWidth: '600px',
    },
  },
});