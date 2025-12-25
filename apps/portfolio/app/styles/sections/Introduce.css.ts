import { style } from '@vanilla-extract/css';
import { mediaQueries } from '../breakpoints.css';
import { vars } from '../globalTheme.css';

export const introduceWrapper = style({
  width: '100%',
  height: 'auto',
  paddingBottom: '5rem',
  marginTop: '1rem',
});

export const infoSection = style({
  borderRadius: '16px',
  marginTop: '3rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  '@media': {
    [mediaQueries.mobile]: {
      gridTemplateColumns: '1fr',
      marginTop: '1.5rem',
    },
    [mediaQueries.desktop]: {
      gap: '1.5rem',
    },
  },
});

export const mainDescription = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: '500',
  color: vars.themeColor.colors.contentFontColor,
  padding: '10px 16px',
  lineHeight: '1.4',
});
