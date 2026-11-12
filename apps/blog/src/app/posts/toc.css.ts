import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const tocWrapper = style({
  display: 'none',
  position: 'absolute',
  top: 0,
  left: 'calc(100% + 48px)',
  width: 200,
  height: '100%',
  '@media': {
    '(min-width: 1340px)': {
      display: 'block',
    },
  },
});

export const toc = style({
  position: 'sticky',
  top: 120,
  maxHeight: 'calc(100vh - 160px)',
  overflowY: 'auto',
  paddingLeft: 12,
  borderLeft: `1px solid ${themeColor.colors.borderColor}`,
});

export const tocList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const tocLink = style({
  display: 'block',
  fontSize: 13,
  lineHeight: 1.5,
  color: themeColor.colors.subFontColor,
  textDecoration: 'none',
  opacity: 0.7,
  wordBreak: 'keep-all',
  transition: 'opacity 0.15s ease, color 0.15s ease',
  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          opacity: 1,
        },
      },
    },
  },
});

export const tocLinkSub = style({
  fontSize: 12,
});

export const tocLinkActive = style({
  opacity: 1,
  color: themeColor.colors.titleFontColor,
  fontWeight: 500,
});

export const tocMobile = style({
  marginBottom: 32,
  padding: '12px 16px',
  border: `1px solid ${themeColor.colors.borderColor}`,
  borderRadius: 8,
  '@media': {
    '(min-width: 1340px)': {
      display: 'none',
    },
  },
});

export const tocSummary = style({
  fontSize: 14,
  color: themeColor.colors.subFontColor,
  cursor: 'pointer',
  userSelect: 'none',
});

export const tocMobileNav = style({
  marginTop: 12,
});
