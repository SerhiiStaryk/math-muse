import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
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
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 32,
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
};
