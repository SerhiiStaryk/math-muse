import { Box, styled, Typography } from '@mui/material';

export const StyledMotivationalFooterContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: `${theme.spacing(4)} ${theme.spacing(3)}`,
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(4),
  background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
}));

export const StyledMotivationalFooterTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: '8px',
});

export const StyledMotivationalFooterSubtitle = styled(Typography)({
  color: 'text.secondary',
});
