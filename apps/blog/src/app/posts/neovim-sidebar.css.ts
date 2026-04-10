import { style, globalStyle, createVar } from '@vanilla-extract/css';

const bg = createVar();
const bgDarker = createVar();
const fg = createVar();
const fgDim = createVar();
const selection = createVar();
const green = createVar();
const blue = createVar();
const yellow = createVar();
const mauve = createVar();
const titleColor = createVar();

const mono = '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace';
const sans = '"Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const sidebarBase = style({});

globalStyle(`[data-theme="dark"] ${sidebarBase}`, {
  vars: {
    [bg]: '#1c1c1e',
    [bgDarker]: '#161618',
    [fg]: '#d4d4d8',
    [fgDim]: '#71717a',
    [selection]: '#27272a',
    [green]: '#86efac',
    [blue]: '#93c5fd',
    [yellow]: '#fde68a',
    [mauve]: '#c4b5fd',
    [titleColor]: '#f4f4f5',
  },
});

globalStyle(`[data-theme="light"] ${sidebarBase}`, {
  vars: {
    [bg]: '#fafafa',
    [bgDarker]: '#f4f4f5',
    [fg]: '#3f3f46',
    [fgDim]: '#a1a1aa',
    [selection]: '#e4e4e7',
    [green]: '#22c55e',
    [blue]: '#3b82f6',
    [yellow]: '#eab308',
    [mauve]: '#8b5cf6',
    [titleColor]: '#18181b',
  },
});

export const sidebar = style([
  sidebarBase,
  {
    width: '400px',
    minWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: bg,
    borderRadius: '12px',
    overflow: 'auto',
    fontSize: '0.9rem',
    lineHeight: 1.8,
    flexShrink: 0,
    height: 'calc(100vh - 78px - 36px)',
    transition:
      'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), margin 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, opacity',

    '@media': {
      '(max-width: 1024px)': {
        display: 'none',
      },
    },
  },
]);

export const header = style({
  padding: '6px 12px',
  backgroundColor: bgDarker,
  color: blue,
  fontFamily: mono,
  fontWeight: 600,
  fontSize: '0.85rem',
  borderBottom: `1px solid ${selection}`,
  flexShrink: 0,
});

export const sidebarHidden = style({
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateX(-10px)',
  marginRight: '-400px',
});

export const tagFilter = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  padding: '10px 14px',
  flexShrink: 0,
  transition: 'box-shadow 0.15s ease',
});

export const tagFilterFocused = style({
  boxShadow: `inset 0 0 0 1px ${green}`,
});

export const tagActive = style({
  padding: '3px 10px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: sans,
  fontSize: '0.82rem',
  backgroundColor: green,
  color: bg,
  fontWeight: 600,
});

export const tagInactive = style({
  padding: '3px 10px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: sans,
  fontSize: '0.82rem',
  backgroundColor: 'transparent',
  color: fg,
  ':hover': {
    color: fg,
    backgroundColor: selection,
  },
});

export const fileList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '6px 6px',
});

export const fileItem = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 14px',
  cursor: 'pointer',
  color: fg,
  fontFamily: sans,
  borderRadius: '6px',
  position: 'relative',
  ':hover': {
    backgroundColor: selection,
  },
});

export const fileItemActive = style({
  backgroundColor: selection,
});

export const fileItemReading = style({
  backgroundColor: '#86efac1a',
});

export const viewBadge = style({
  position: 'absolute',
  top: '6px',
  right: '8px',
  padding: '1px 6px',
  borderRadius: '3px',
  fontSize: '0.65rem',
  fontWeight: 600,
  fontFamily: mono,
  color: '#86efac',
  backgroundColor: '#86efac1a',
  letterSpacing: '0.05em',
});

export const fileItemRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});

export const tag = style({
  color: mauve,
  fontSize: '0.78rem',
  fontWeight: 500,
  flexShrink: 0,
});

export const title = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: 600,
  color: titleColor,
  fontSize: '1rem',
  letterSpacing: '-0.01em',
});

export const date = style({
  color: fgDim,
  fontSize: '0.78rem',
  marginTop: '2px',
});

export const statusBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 14px',
  fontFamily: mono,
  fontSize: '0.75rem',
  color: fgDim,
  flexShrink: 0,
});

export const mode = style({
  color: green,
  fontWeight: 600,
});

export const info = style({
  color: fgDim,
});

export const hints = style({
  display: 'flex',
  gap: '12px',
});

export const hintKey = style({
  color: fgDim,
  marginRight: '3px',
});
