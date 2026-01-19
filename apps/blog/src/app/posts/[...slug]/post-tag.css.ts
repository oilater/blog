import { style } from '@vanilla-extract/css';

export const tagHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '0.5rem',
});

export const tagLink = style({
  fontSize: '0.875rem',
  padding: '0.25rem 0.75rem',
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  borderRadius: '9999px',
  textDecoration: 'none',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#bfdbfe',
  },
});
