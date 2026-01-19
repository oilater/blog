import { style } from '@vanilla-extract/css';

export const tagHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

export const tagLink = style({
  fontSize: '0.725rem',
  padding: '0.2rem 0.5rem',
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  borderRadius: '0.25rem',
  textDecoration: 'none',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#bfdbfe',
  },
});

export const metaRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
