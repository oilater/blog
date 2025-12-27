import { style } from '@vanilla-extract/css';

export const wrapper = style({
  maxWidth: '768px',
  minHeight: '90vh',
  margin: '0 auto',
  width: '100%',
});

export const post = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  color: '#495057',
});

export const postTitle = style({
  fontSize: '48px',
  fontWeight: 'bold',
  marginBottom: '32px',
});

export const description = style({
  fontSize: '16px',
  marginBottom: '14px',
});

export const author = style({
  fontWeight: '600',
});

export const postedAt = style({
  fontWeight: '400',
});

export const postTags = style({
  display: 'flex',
  gap: '8px',
});

export const postContent = style({
  margin: '5rem auto 0',
  fontSize: '16px',
  lineHeight: '1.5',
});
