import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const header = style({
  zIndex: 100,
  height: 46,
  backgroundColor: 'rgba(232, 243, 255, 0.5)',
  backdropFilter: 'blur(5px)',
  borderRadius: 20,
  position: 'fixed',
  top: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 24px 0 24px',
});

export const innerNav = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 24,
});

export const linkItem = style({
  fontSize: 16,
  fontWeight: 500,
  color: vars.themeColor.colors.titleFontColor,
  padding: '6px 6px',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
