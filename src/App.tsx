import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import baseTheme from './theme';
import router from './router/router';
import { SettingsProvider, useSettings } from './context/SettingsContext';

const ThemedApp = () => {
  const { settings } = useSettings();

  const theme = useMemo(() => {
    // Create dynamic theme based on settings
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
              ...baseTheme.components?.MuiButton?.styleOverrides?.root,
              transition: settings.reduceMotion
                ? 'none'
                : baseTheme.components?.MuiButton?.styleOverrides?.root?.transition,
              '&:hover': settings.reduceMotion
                ? {}
                : baseTheme.components?.MuiButton?.styleOverrides?.root?.['&:hover'],
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              ...baseTheme.components?.MuiCard?.styleOverrides?.root,
              transition: settings.reduceMotion
                ? 'none'
                : baseTheme.components?.MuiCard?.styleOverrides?.root?.transition,
              '&:hover': settings.reduceMotion ? {} : baseTheme.components?.MuiCard?.styleOverrides?.root?.['&:hover'],
            },
          },
        },
      },
    });
  }, [settings.largeText, settings.highContrast, settings.reduceMotion]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

const App = () => (
  <SettingsProvider>
    <ThemedApp />
  </SettingsProvider>
);

export default App;
