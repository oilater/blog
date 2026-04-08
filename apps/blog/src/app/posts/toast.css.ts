import { style, keyframes } from '@vanilla-extract/css';

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const toast = style({
  position: 'fixed',
  bottom: '56px',
  right: '24px',
  zIndex: 30,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '8px',
  backgroundColor: '#313244',
  color: '#cdd6f4',
  fontSize: '0.9rem',
  fontWeight: 500,
  fontFamily: '"SF Mono", "Fira Code", Menlo, Consolas, monospace',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
  border: '1px solid #45475a',
  animation: `${slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
});

export const message = style({
  lineHeight: 1.4,
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  color: '#cdd6f4',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: '2px 4px',
  flexShrink: 0,
  ':hover': {
    color: '#cdd6f4',
  },
});
