import { style } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

export const card = style({
  paddingTop: 10,
  paddingBottom: 20,
});

export const cardTitle = style({
  paddingBottom: 20,
  display: 'flex',
  alignItems: 'center',
  fontSize: 22,
  fontWeight: 600,
  color: vars.themeColor.colors.cardTitleFontColor,
  selectors: {
    [`${card}:hover &`]: {
      color: vars.colors.blue700,
    },
  },
  transition: 'color 0.2s ease-out',
});

export const cardDescription = style({
  fontSize: 16,
  color: vars.themeColor.colors.contentFontColor,
  margin: '0 0 24px',
});

export const cardFooter = style({
  paddingTop: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 14,
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
