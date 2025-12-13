import type { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily: '"Fredoka", "Comic Neue", "Quicksand", "Rounded Mplus 1c", "Segoe UI", Roboto, sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '3.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.75rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  h3: {
    fontWeight: 600,
    fontSize: '2.25rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  button: {
    fontWeight: 600,
    textTransform: 'none', // Keep natural casing for playful feel
    letterSpacing: '0.02em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight: 400,
  },
};
