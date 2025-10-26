import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#fffde7',
    },
    action: {
      active: '#fff',
    },
  },
  typography: {
    fontFamily: '"Comic Neue", "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
});

export default theme;
