import { globalStyle, style } from '@vanilla-extract/css';

const MOBILE = '(max-width: 599px)';

// 줍줍영어 이미지 배경색(#3f63f7 부근)에 맞춰 아이콘이 카드에 녹아들게 한다.
const BRAND_FROM = '#4d71fa';
const BRAND_TO = '#3656ee';

export const card = style({
  position: 'relative',
  marginBottom: 32,
  borderRadius: 20,
  background: `linear-gradient(135deg, ${BRAND_FROM} 0%, ${BRAND_TO} 100%)`,
  boxShadow: '0 8px 24px -12px rgba(54, 86, 238, 0.6)',
  color: '#fff',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 14px 32px -14px rgba(54, 86, 238, 0.75)',
        },
      },
    },
  },
});

// 이미 닫은 사람은 인라인 스크립트가 <html>에 표시해 두므로 첫 페인트부터 숨긴다.
globalStyle(`[data-hide-announcement] ${card}`, {
  display: 'none',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '16px 52px 16px 16px',
  color: 'inherit',
  textDecoration: 'none',
  '@media': {
    [MOBILE]: {
      flexWrap: 'wrap',
      rowGap: 14,
      columnGap: 12,
      padding: '16px 44px 16px 16px',
    },
  },
});

export const icon = style({
  flexShrink: 0,
  width: 72,
  height: 72,
  borderRadius: 18,
  '@media': {
    [MOBILE]: { width: 48, height: 48, borderRadius: 12 },
  },
});

export const body = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
  '@media': {
    [MOBILE]: { flexBasis: 'calc(100% - 62px)' },
  },
});

export const title = style({
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: '-0.01em',
  '@media': {
    [MOBILE]: { fontSize: 15 },
  },
});

export const description = style({
  fontSize: 14,
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.82)',
  '@media': {
    [MOBILE]: { fontSize: 13 },
  },
  wordBreak: 'keep-all',
});

export const cta = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  padding: '9px 12px 9px 16px',
  borderRadius: 999,
  backgroundColor: '#fff',
  color: BRAND_TO,
  fontSize: 14,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  transition: 'gap 0.2s ease',
  selectors: {
    [`${card}:hover &`]: { gap: 6 },
  },
  '@media': {
    [MOBILE]: {
      width: '100%',
      justifyContent: 'center',
      marginRight: -28,
    },
  },
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
  color: 'rgba(255, 255, 255, 0.75)',
  background: 'transparent',
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  ':hover': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
});
