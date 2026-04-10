import { globalStyle } from '@vanilla-extract/css';
import { themeColor } from '#tokens/theme.css';

globalStyle('body', {
  boxSizing: 'border-box',
  vars: { '--highlight': themeColor.colors.highLightFontColor },
  backgroundColor: themeColor.colors.mainBackground,
  fontFamily:
    '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
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

globalStyle('body::before', {
  content: '""',
  position: 'fixed',
  top: '-100px',
  left: '-100px',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
  pointerEvents: 'none',
  zIndex: 0,
});

globalStyle('[data-theme="light"] body::before', {
  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
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
