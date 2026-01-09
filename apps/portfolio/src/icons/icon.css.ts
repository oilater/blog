import { style } from '@vanilla-extract/css';

export const githubIcon = style({
  width: 36,
  height: 36,
  display: 'block',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.2)',
  },
});

export const velogIcon = style({
  width: 30,
  height: 30,
  display: 'block',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.2)',
  },
});
