import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

const pretendard = 'Pretendard';

globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2-subset/Pretendard-Regular.subset.woff2") format("woff2")',
  fontWeight: 400,
  fontDisplay: 'swap',
});

globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2-subset/Pretendard-Medium.subset.woff2") format("woff2")',
  fontWeight: 500,
  fontDisplay: 'swap',
});

globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2-subset/Pretendard-SemiBold.subset.woff2") format("woff2")',
  fontWeight: 600,
  fontDisplay: 'swap',
});

globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2-subset/Pretendard-Bold.subset.woff2") format("woff2")',
  fontWeight: 700,
  fontDisplay: 'swap',
});

globalStyle('body', {
  boxSizing: 'border-box',
  backgroundColor: themeColor.colors.mainBackground,
  fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  transition: 'background-color 0.2s ease-out',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      transition: 'none !important',
    },
  },
});

globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
  border: 0,
  display: 'block',
});

globalStyle('button', {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  font: 'inherit',
});

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  margin: 0,
  padding: 0,
});

globalStyle('a', {
  textDecoration: 'none',
  color: themeColor.colors.mainFontColor,
});
