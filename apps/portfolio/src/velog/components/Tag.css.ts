import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
});

export const tag = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.themeColor.colors.tagBackground,
  color: vars.themeColor.colors.tagItemColor,
  fontSize: '14px',
  fontWeight: '500',
  padding: '6px 13px',
  borderRadius: '14px',
});
