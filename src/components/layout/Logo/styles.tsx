import { Box, styled, Typography } from '@mui/material';

export const StyledLogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
});

export const StyledLogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: 0.5,
  textDecoration: 'none',
  color: theme.palette.primary.contrastText,
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));
