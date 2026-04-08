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

const sidebarBase = style({});

globalStyle(`[data-theme="dark"] ${sidebarBase}`, {
  vars: {
    [bg]: '#1e1e2e',
    [bgDarker]: '#181825',
    [fg]: '#cdd6f4',
    [fgDim]: '#585b70',
    [selection]: '#313244',
    [green]: '#a6e3a1',
    [blue]: '#89b4fa',
    [yellow]: '#f9e2af',
    [mauve]: '#cba6f7',
    [titleColor]: '#e4e4e5',
  },
});

globalStyle(`[data-theme="light"] ${sidebarBase}`, {
  vars: {
    [bg]: '#eff1f5',
    [bgDarker]: '#e6e9ef',
    [fg]: '#4c4f69',
    [fgDim]: '#9ca0b0',
    [selection]: '#ccd0da',
    [green]: '#40a02b',
    [blue]: '#1e66f5',
    [yellow]: '#df8e1d',
    [mauve]: '#8839ef',
    [titleColor]: '#4c4f69',
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
    overflow: 'hidden',
    fontFamily: mono,
    fontSize: '0.9rem',
    lineHeight: 1.7,
    flexShrink: 0,
    position: 'sticky',
    top: '78px',
    alignSelf: 'flex-start',
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
  gap: '4px',
  padding: '8px 10px',
  borderBottom: `1px solid ${selection}`,
  flexShrink: 0,
  transition: 'box-shadow 0.15s ease',
});

export const tagFilterFocused = style({
  boxShadow: `inset 0 0 0 1px ${green}`,
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
  flexDirection: 'column',
  gap: '4px',
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
  fontWeight: 600,
  color: titleColor,
  fontSize: '0.92rem',
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
