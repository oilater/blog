import { style, keyframes } from '@vanilla-extract/css';

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const toast = style({
  position: 'fixed',
  bottom: '64px',
  right: '40px',
  zIndex: 30,
  display: 'none',
  '@media': {
    '(min-width: 1025px)': {
      display: 'flex',
    },
  },
  alignItems: 'center',
  gap: '8px',
  padding: '8px 14px',
  borderRadius: '8px',
  backgroundColor: '#313244',
  color: '#cdd6f4',
  fontSize: '1rem',
  fontWeight: 500,
  fontFamily: '"SF Mono", "Fira Code", Menlo, Consolas, monospace',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
  border: '1px solid #45475a',
  animation: `${slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
});

export const message = style({
  lineHeight: 1.4,
});

export const link = style({
  color: '#a6e3a1',
  cursor: 'pointer',
  textDecoration: 'none',
  ':hover': {
    opacity: 0.8,
  },
});
