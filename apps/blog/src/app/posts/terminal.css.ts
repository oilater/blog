import { style } from '@vanilla-extract/css';
import { themeColor } from '#/tokens/theme.css';

export const terminal = style({
  fontFamily: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace',
  fontSize: '0.8rem',
  lineHeight: 1.6,
  padding: '8px 12px',
  backgroundColor: '#1e1e2e',
  color: '#cdd6f4',
  cursor: 'text',
  minHeight: 36,
  maxHeight: '150px',
  overflowY: 'auto',
  borderBottom: '1px solid #313244',
  flexShrink: 0,
});

export const line = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const prompt = style({
  color: '#a6e3a1',
  whiteSpace: 'pre',
  flexShrink: 0,
});

export const input = style({
  flex: 1,
  minWidth: 0,
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
