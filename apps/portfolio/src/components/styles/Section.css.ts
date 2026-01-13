import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  paddingBottom: 64,
});

export const contentSection = style({
  display: 'grid',
  gap: '54px 20px',
  gridTemplateColumns: '1fr',

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const workSection = style({
  display: 'grid',
  gap: '54px 16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
});

export const mainDescription = style({
  fontSize: 16,
  fontWeight: '400',
  color: themeColor.colors.contentFontColor,
  lineHeight: '1.65',
  marginBottom: 40,
});

export const hr = style({
  border: '0',
  height: '2px',
  background: 'rgba(222, 222, 255, 0.19)',
});
