import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const card = style({
  cursor: 'pointer',
  paddingTop: '10px',
  paddingBottom: '40px',
  borderBottom: `0.2px solid ${vars.themeColor.colors.borderColor}`,
});

export const cardHeader = style({
  marginBottom: '16px',
});

export const cardTitle = style({
  height: '75px',
  fontSize: '24px',
  fontWeight: '600',
  color: vars.themeColor.colors.cardTitleFontColor,
  lineHeight: '1.4',
  display: 'flex',
  alignItems: 'center',
});

export const cardDescription = style({
  fontSize: '16px',
  color: vars.themeColor.colors.contentFontColor,
  lineHeight: '1.6',
  margin: '8px 0 32px',
});

export const cardFooter = style({
  paddingTop: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '14px',
  color: vars.themeColor.colors.contentFontColor,
});

export const cardDate = style({
  fontSize: '14px',
  color: '#868e96',
  fontWeight: '400',
});

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
