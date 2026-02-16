import { createTheme, Theme } from '@mui/material/styles';
import baseTheme from './index';
import { Settings } from '@/helpers';

// Define a reusable type for styleOverrides
type StyleOverrides = {
  transition?: string;
  '&:hover'?: Record<string, unknown>;
};

export const createAppTheme = (settings: Settings): Theme => {
  return createTheme({
    ...baseTheme,
    typography: {
      ...baseTheme.typography,
      fontSize: settings.largeText ? 18 : 14,
    },
    palette: settings.highContrast
      ? {
          ...baseTheme.palette,
          background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
          },
          text: {
            primary: '#000000',
            secondary: '#333333',
          },
        }
      : baseTheme.palette,
    components: {
      ...baseTheme.components,
      MuiButton: {
        styleOverrides: {
          root: {
            ...((baseTheme.components?.MuiButton?.styleOverrides?.root as Partial<StyleOverrides>) ?? {}),
            transition: settings.reduceMotion
              ? 'none'
              : (baseTheme.components?.MuiButton?.styleOverrides?.root as Partial<StyleOverrides>)?.transition,
            '&:hover': settings.reduceMotion
              ? {}
              : (baseTheme.components?.MuiButton?.styleOverrides?.root as Partial<StyleOverrides>)?.['&:hover'],
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            ...((baseTheme.components?.MuiCard?.styleOverrides?.root as Partial<StyleOverrides>) ?? {}),
            transition: settings.reduceMotion
              ? 'none'
              : (baseTheme.components?.MuiCard?.styleOverrides?.root as Partial<StyleOverrides>)?.transition,
            '&:hover': settings.reduceMotion
              ? {}
              : (baseTheme.components?.MuiCard?.styleOverrides?.root as Partial<StyleOverrides>)?.['&:hover'],
          },
        },
      },
    },
  });
};
