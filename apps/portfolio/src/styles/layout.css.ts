import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const header = style({
  zIndex: 100,
  backgroundColor: 'rgba(232, 243, 255, 0.5)',
  backdropFilter: 'blur(5px)',
  borderRadius: '32px',
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  padding: '10px 24px 10px 24px',
  transition: 'opacity 0.3s ease-in-out',
  selectors: {
    'body.active-border &': {
      borderBottom: `1px solid ${vars.colors.grey300}`,
    },
  },
});

export const innerNav = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
});

export const linkItem = style({
  fontSize: '17px',
  fontWeight: '500',
  color: vars.themeColor.colors.subFontColor,
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  padding: '6px 6px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  willChange: 'color',
  msTransition: 'all 0.1s ease-in',
  ':hover': {
    color: vars.themeColor.colors.titleFontColor,
  },

  selectors: {
    '&.active': {
      color: vars.themeColor.colors.titleFontColor,
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  paddingBottom: '24px',
});

export const githubIcon = style({
  width: '36px',
  height: '36px',
  display: 'block',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.2)',
  },
});

export const velogIcon = style({
  width: '30px',
  height: '30px',
  display: 'block',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.2)',
  },
});
