import { style } from '@vanilla-extract/css';
import { mediaQueries, vars } from '#tokens/theme.css';

export const articleRoot = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  color: vars.themeColor.colors.cardTitleFontColor,
});

export const articleHeader = style({
  width: '100%',
  position: 'relative',
  height: 'calc(-200px + 100vh)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 120,
  color: '#fff',
});

export const articleHeaderTitleSection = style({
  position: 'absolute',
  bottom: '20%',
  textAlign: 'center',
  zIndex: 2,
});

export const articleHeaderTitle = style({
  fontSize: 'calc(1rem + 2vw)',
  fontWeight: 600,
  lineHeight: 1.4,
  marginBottom: 20,
});

export const articleHeaderDate = style({
  fontSize: 18,
  fontWeight: 400,
});

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const articleHeaderImage = style({
  position: 'absolute',
  inset: 0,
  objectFit: 'cover',
});

export const imageGradient = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '80%',
  background:
    'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.8) 100%)',
  pointerEvents: 'none',
  zIndex: 1,
});

export const articleContent = style({
  margin: '0 auto',
  width: '100%',
  maxWidth: '800px',
  height: '100%',
  fontSize: '20px',
  whiteSpace: 'pre-wrap',
  lineHeight: 1.68,
  marginBottom: '10rem',
  '@media': {
    [mediaQueries.mobile]: {
      padding: '0 16px',
      fontSize: 18,
    },
  },
});

export const button = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#C3C3C6',
  fontSize: '1.2rem',
  fontWeight: 500,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
