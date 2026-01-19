import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '2rem 1rem',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '2rem',
});

export const tagFilter = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '2rem',
});

export const tagButton = style({
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background-color 0.2s',
  fontSize: '0.9rem',
});

export const tagButtonActive = style({
  backgroundColor: '#2563eb',
  color: 'white',
});

export const tagButtonInactive = style({
  backgroundColor: '#e5e7eb',
  color: '#1f2937',
  ':hover': {
    backgroundColor: '#d1d5db',
  },
});

export const postsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const postCard = style({
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  transition: 'box-shadow 0.2s',
  ':hover': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
});

export const postLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
});

export const postHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
});

export const postTitle = style({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#111827',
  selectors: {
    [`${postLink}:hover &`]: {
      color: '#2563eb',
    },
  },
});

export const postTagBadge = style({
  fontSize: '0.875rem',
  padding: '0.25rem 0.5rem',
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  borderRadius: '0.25rem',
});

export const postDate = style({
  fontSize: '0.875rem',
  color: '#6b7280',
});

export const noPosts = style({
  color: '#6b7280',
});
