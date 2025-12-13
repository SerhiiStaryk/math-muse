import type { PaletteOptions } from '@mui/material/styles';

export const palette: PaletteOptions = {
  primary: {
    main: '#FF6B6B', // Vibrant coral red - Pixar's energetic primary
    light: '#FF8E8E',
    dark: '#E85555',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4ECDC4', // Bright turquoise - playful accent
    light: '#7EDDD6',
    dark: '#3DB8AF',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFF9E6', // Warm cream - soft, inviting background
    paper: '#FFFFFF',
  },
  success: {
    main: '#95E1D3', // Soft mint green
    light: '#B8EDE3',
    dark: '#7DCDC0',
  },
  warning: {
    main: '#FFD93D', // Sunny yellow
    light: '#FFE066',
    dark: '#F0C62E',
  },
  error: {
    main: '#FF6B9D', // Playful pink-red
    light: '#FF8FB3',
    dark: '#E85585',
  },
  info: {
    main: '#6C5CE7', // Vibrant purple
    light: '#8B7EEA',
    dark: '#5748C8',
  },
  text: {
    primary: '#2D3436', // Deep charcoal for readability
    secondary: '#636E72',
  },
  action: {
    active: '#FF6B6B',
    hover: 'rgba(255, 107, 107, 0.08)',
    selected: 'rgba(255, 107, 107, 0.16)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  divider: 'rgba(78, 205, 196, 0.2)',
};
