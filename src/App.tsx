import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo } from 'react';
import router from './router/router';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { createAppTheme } from './theme/themeFactory';

const ThemedApp = () => {
  const { settings } = useSettings();

  const theme = useMemo(
    () => createAppTheme(settings),
    [settings.largeText, settings.highContrast, settings.reduceMotion]
  );

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
