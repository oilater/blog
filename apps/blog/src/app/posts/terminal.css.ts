import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const terminal = style({
  fontFamily: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace',
  fontSize: '0.85rem',
  lineHeight: 1.6,
  padding: '12px 16px',
  marginBottom: '1.5rem',
  borderRadius: '12px',
  backgroundColor: '#1e1e2e',
  color: '#cdd6f4',
  cursor: 'text',
  minHeight: 44,
});

export const line = style({
  display: 'flex',
  alignItems: 'center',
});

export const prompt = style({
  color: '#a6e3a1',
  whiteSpace: 'pre',
  flexShrink: 0,
});

export const input = style({
  flex: 1,
  background: 'none',
  border: 'none',
  outline: 'none',
  color: '#cdd6f4',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  padding: 0,
  caretShape: 'block',
  caretColor: '#f5e0dc',
});

export const output = style({
  color: '#bac2de',
  margin: 0,
  padding: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  whiteSpace: 'pre-wrap',
});
