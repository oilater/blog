import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const thumbnail = style({
  position: 'relative',
  flexShrink: 0,
  width: 72,
  height: 72,
  borderRadius: 12,
  overflow: 'hidden',
  '@media': {
    '(max-width: 640px)': {
      width: 56,
      height: 56,
      borderRadius: 10,
    },
  },
});

export const image = style({
  objectFit: 'cover',
});


export const iconBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: themeColor.colors.mainBackground,
  color: themeColor.colors.cardDescriptionFontColor,
});
