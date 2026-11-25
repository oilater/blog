import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const container = style({
  margin: '0 auto',
  maxWidth: '820px',
  width: '100%',
});

export const tagFilter = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '2rem',
});

export const tagButton = style({
  padding: '6px 12px',
  borderRadius: 16,
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: 13,
  fontWeight: 500,
  transition: 'all 0.15s ease',
});

export const tagButtonActive = style({
  backgroundColor: themeColor.colors.highLightFontColor,
  color: '#fff',
});

export const tagButtonInactive = style({
  backgroundColor: 'transparent',
  color: themeColor.colors.subFontColor,
  borderColor: themeColor.colors.borderColor,
  ':hover': {
    color: themeColor.colors.titleFontColor,
    borderColor: themeColor.colors.highLightFontColor,
  },
});

export const tagSeparator = style({
  color: themeColor.colors.borderColor,
  fontSize: 15,
  alignSelf: 'center',
  padding: '0 2px',
  userSelect: 'none',
});

export const postsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const postLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '20px 20px 20px 24px',
  borderRadius: 20,
  // Keep border-radius as the fallback while newer browsers render a continuous squircle curve.
  // @ts-expect-error cornerShape is not included in vanilla-extract's CSS types yet.
  cornerShape: 'squircle',
  backgroundColor: themeColor.colors.surface,
  color: 'inherit',
  textDecoration: 'none',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          transform: 'translateY(-2px)',
          backgroundColor: themeColor.colors.surfaceHover,
        },
      },
    },
    '(max-width: 599px)': {
      padding: '18px 14px 18px 18px',
      borderRadius: 18,
    },
  },
  ':active': {
    transform: 'scale(0.98)',
  },
});

export const postBody = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const postMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const postTagBadge = style({
  padding: '3px 10px',
  borderRadius: 999,
  backgroundColor: themeColor.colors.accentSoft,
  color: themeColor.colors.highLightFontColor,
  fontSize: 12,
  fontWeight: 600,
});

export const postDate = style({
  fontSize: 13,
  color: themeColor.colors.cardDescriptionFontColor,
});

export const postTitle = style({
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: '-0.01em',
  color: themeColor.colors.titleFontColor,
  wordBreak: 'keep-all',
  '@media': {
    '(max-width: 599px)': { fontSize: 17 },
  },
});

export const postExcerpt = style({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  color: themeColor.colors.cardDescriptionFontColor,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'keep-all',
});

export const postChevron = style({
  flexShrink: 0,
  display: 'flex',
  color: themeColor.colors.cardDescriptionFontColor,
  opacity: 0.6,
  transition: 'transform 0.2s ease, opacity 0.2s ease, color 0.2s ease',
  '@media': {
    // 모바일은 카드 전체를 누르는 게 자연스러워서 제목 폭을 더 주기 위해 숨긴다.
    '(max-width: 599px)': { display: 'none' },
  },
  selectors: {
    [`${postLink}:hover &`]: {
      transform: 'translateX(3px)',
      opacity: 1,
      color: themeColor.colors.highLightFontColor,
    },
  },
});

export const noPosts = style({
  color: themeColor.colors.subFontColor,
});
