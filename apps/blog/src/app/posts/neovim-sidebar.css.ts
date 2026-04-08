import { style } from '@vanilla-extract/css';

const bg = '#1e1e2e';
const bgDarker = '#181825';
const fg = '#cdd6f4';
const fgDim = '#585b70';
const selection = '#313244';
const green = '#a6e3a1';
const blue = '#89b4fa';
const yellow = '#f9e2af';
const mauve = '#cba6f7';

const mono = '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace';

export const sidebar = style({
  width: '400px',
  minWidth: '360px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: bg,
  borderRadius: '12px',
  overflow: 'hidden',
  fontFamily: mono,
  fontSize: '0.9rem',
  lineHeight: 1.7,
  flexShrink: 0,
  position: 'sticky',
  top: '78px',
  alignSelf: 'flex-start',
  height: 'calc(100vh - 78px - 36px)',

  '@media': {
    '(max-width: 1024px)': {
      display: 'none',
    },
  },
});

export const header = style({
  padding: '6px 12px',
  backgroundColor: bgDarker,
  color: blue,
  fontWeight: 600,
  fontSize: '0.85rem',
  borderBottom: `1px solid ${selection}`,
  flexShrink: 0,
});

export const tagFilter = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  padding: '8px 10px',
  borderBottom: `1px solid ${selection}`,
  flexShrink: 0,
});

export const tagActive = style({
  padding: '2px 8px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: mono,
  fontSize: '0.8rem',
  backgroundColor: green,
  color: bg,
  fontWeight: 600,
});

export const tagInactive = style({
  padding: '2px 8px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: mono,
  fontSize: '0.8rem',
  backgroundColor: 'transparent',
  color: fgDim,
  ':hover': {
    color: fg,
    backgroundColor: selection,
  },
});

export const fileList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '4px 0',
});

export const fileItem = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 12px',
  cursor: 'pointer',
  color: fg,
  borderLeft: '2px solid transparent',
  ':hover': {
    backgroundColor: selection,
  },
});

export const fileItemActive = style({
  backgroundColor: selection,
  borderLeftColor: green,
});

export const fileItemRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const tag = style({
  color: mauve,
  fontSize: '0.75rem',
  flexShrink: 0,
});

export const title = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: 500,
});

export const date = style({
  color: fgDim,
  fontSize: '0.75rem',
  marginTop: '2px',
});

export const statusBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '3px 12px',
  backgroundColor: bgDarker,
  borderTop: `1px solid ${selection}`,
  fontSize: '0.8rem',
  flexShrink: 0,
});

export const mode = style({
  color: green,
  fontWeight: 700,
});

export const info = style({
  color: fgDim,
});

export const hints = style({
  display: 'flex',
  gap: '12px',
  padding: '4px 12px',
  backgroundColor: bgDarker,
  fontSize: '0.75rem',
  color: fgDim,
  flexShrink: 0,
});

export const hintKey = style({
  color: yellow,
  marginRight: '4px',
});
