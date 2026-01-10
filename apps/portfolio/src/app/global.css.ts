import { globalStyle } from '@vanilla-extract/css';
import { vars } from '#tokens/theme.css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('body', {
  backgroundColor: vars.themeColor.colors.mainBackground,
  fontFamily:
    '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  transition: 'background-color 0.2s ease-out',
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

globalStyle('a', {
  textDecoration: 'none',
  color: vars.themeColor.colors.mainFontColor,
});

globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      transition: 'none !important',
    },
  },
});
