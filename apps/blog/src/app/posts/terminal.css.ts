import { style } from '@vanilla-extract/css';

export const terminal = style({
  fontFamily: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace',
  fontSize: '0.8rem',
  lineHeight: 1.6,
  padding: '8px 12px',
  background: 'none',
  color: 'inherit',
  cursor: 'text',
  minHeight: 36,
  maxHeight: '150px',
  overflowY: 'auto',
  flexShrink: 0,
});

export const line = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const prompt = style({
  whiteSpace: 'pre',
  flexShrink: 0,
});

export const input = style({
  flex: 1,
  minWidth: 0,
  background: 'none',
  border: 'none',
  outline: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  padding: 0,
  caretShape: 'block',
});

export const output = style({
  margin: 0,
  padding: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  whiteSpace: 'pre-wrap',
});
