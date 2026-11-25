import { globalStyle, style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

const MOBILE = '(max-width: 599px)';

export const card = style({
  position: 'relative',
  marginBottom: 32,
  borderRadius: 16,
  border: `1px solid ${themeColor.colors.borderColor}`,
  backgroundColor: themeColor.colors.cardBackground,
  transition: 'border-color 0.15s ease',
  ':hover': {
    borderColor: themeColor.colors.highLightFontColor,
  },
});

// 이미 닫은 사람은 인라인 스크립트가 <html>에 표시해 두므로 첫 페인트부터 숨긴다.
globalStyle(`[data-hide-announcement] ${card}`, {
  display: 'none',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: 16,
  paddingRight: 48,
  color: 'inherit',
  textDecoration: 'none',
  '@media': {
    [MOBILE]: { padding: '16px 44px 16px 18px' },
  },
});

export const thumbnail = style({
  flexShrink: 0,
  width: 160,
  height: 84,
  borderRadius: 10,
  objectFit: 'cover',
  '@media': {
    [MOBILE]: { display: 'none' },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
});

export const title = style({
  fontSize: 16,
  fontWeight: 600,
  color: themeColor.colors.titleFontColor,
});

export const description = style({
  fontSize: 14,
  lineHeight: 1.5,
  color: themeColor.colors.cardDescriptionFontColor,
  wordBreak: 'keep-all',
});

export const cta = style({
  marginTop: 4,
  fontSize: 13,
  fontWeight: 500,
  color: themeColor.colors.highLightFontColor,
});

export const close = style({
  position: 'absolute',
  top: 10,
  right: 10,
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  color: themeColor.colors.cardDescriptionFontColor,
  background: 'transparent',
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  ':hover': {
    color: themeColor.colors.titleFontColor,
    backgroundColor: themeColor.colors.tagBackground,
  },
});
