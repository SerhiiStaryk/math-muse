import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

const theme = createTheme({
  palette,
  typography,
  components,
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
});

export default theme;
