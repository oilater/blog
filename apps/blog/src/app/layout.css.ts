import { style } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

export const header = style({
  zIndex: 10,
  maxWidth: 'calc(100% - 40px)',
  width: '100%',
  height: 70,
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: themeColor.colors.mainBackground,
  transition: 'background-color 0.2s ease-out',

  '@media': {
    '(min-width: 790px)': {
      maxWidth: 750,
    },
  },
});

export const logo = style({
  fontSize: 18,
  fontWeight: 600,
  color: themeColor.colors.titleFontColor,
  textDecoration: 'none',
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});

export const linkItem = style({
  fontSize: 16,
  fontWeight: 500,
  color: themeColor.colors.titleFontColor,
  padding: '6px 6px',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
