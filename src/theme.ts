import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
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
  },
  typography: {
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
  },
  shape: {
    borderRadius: 20, // Rounded corners for that Pixar softness
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(255, 107, 107, 0.15)', // Soft colorful shadows
    '0px 4px 12px rgba(255, 107, 107, 0.18)',
    '0px 6px 16px rgba(78, 205, 196, 0.2)',
    '0px 8px 20px rgba(78, 205, 196, 0.22)',
    '0px 10px 24px rgba(108, 92, 231, 0.15)',
    '0px 12px 28px rgba(108, 92, 231, 0.18)',
    '0px 14px 32px rgba(255, 107, 107, 0.2)',
    '0px 16px 36px rgba(78, 205, 196, 0.22)',
    '0px 18px 40px rgba(108, 92, 231, 0.18)',
    '0px 20px 44px rgba(255, 107, 107, 0.2)',
    '0px 22px 48px rgba(78, 205, 196, 0.2)',
    '0px 24px 52px rgba(108, 92, 231, 0.18)',
    '0px 26px 56px rgba(255, 107, 107, 0.2)',
    '0px 28px 60px rgba(78, 205, 196, 0.22)',
    '0px 30px 64px rgba(108, 92, 231, 0.2)',
    '0px 32px 68px rgba(255, 107, 107, 0.22)',
    '0px 34px 72px rgba(78, 205, 196, 0.24)',
    '0px 36px 76px rgba(108, 92, 231, 0.22)',
    '0px 38px 80px rgba(255, 107, 107, 0.24)',
    '0px 40px 84px rgba(78, 205, 196, 0.26)',
    '0px 42px 88px rgba(108, 92, 231, 0.24)',
    '0px 44px 92px rgba(255, 107, 107, 0.26)',
    '0px 46px 96px rgba(78, 205, 196, 0.28)',
    '0px 48px 100px rgba(108, 92, 231, 0.26)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0px 4px 14px rgba(255, 107, 107, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 20px rgba(255, 107, 107, 0.35)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(78, 205, 196, 0.35)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0px 8px 24px rgba(78, 205, 196, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 16px 40px rgba(78, 205, 196, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 4px 12px rgba(108, 92, 231, 0.15)',
        },
        elevation2: {
          boxShadow: '0px 8px 20px rgba(108, 92, 231, 0.18)',
        },
        elevation3: {
          boxShadow: '0px 12px 28px rgba(108, 92, 231, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)',
            },
            '&.Mui-focused': {
              transform: 'scale(1.02)',
              boxShadow: '0px 4px 12px rgba(255, 107, 107, 0.2)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
          boxShadow: '0px 2px 8px rgba(78, 205, 196, 0.15)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: '#E8F8F5',
          color: '#2D3436',
        },
        standardError: {
          backgroundColor: '#FFE8F0',
          color: '#2D3436',
        },
        standardWarning: {
          backgroundColor: '#FFF9E6',
          color: '#2D3436',
        },
        standardInfo: {
          backgroundColor: '#F0EEFF',
          color: '#2D3436',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(78, 205, 196, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: '4px 0px 20px rgba(108, 92, 231, 0.15)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#4ECDC4',
            '&:hover': {
              backgroundColor: 'rgba(78, 205, 196, 0.08)',
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#4ECDC4',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 8,
        },
        bar: {
          borderRadius: 10,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#FF6B6B',
        },
      },
    },
  },
});

export default theme;
