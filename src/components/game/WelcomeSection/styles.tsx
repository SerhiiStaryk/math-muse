import { Box, Stack, styled, Typography } from '@mui/material';

export const StyledWelcomeSectionContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  marginTop: theme.spacing(2),
}));

export const StyledWelcomeSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #6C5CE7 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
}));

export const StyledWelcomeSectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const StyledChipContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));
