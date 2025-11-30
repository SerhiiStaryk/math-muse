import { Box, Typography } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { ChipList } from './ChipList';

export const WelcomeSection = () => {
  const { settings } = useSettings();

  return (
    <Box sx={{ textAlign: 'center', mb: 6, mt: 2 }}>
      <Typography
        variant={settings.largeText ? 'h2' : 'h3'}
        gutterBottom
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #6C5CE7 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        🎉 Welcome to Math Muse!
      </Typography>
      <Typography
        variant={settings.largeText ? 'h5' : 'h6'}
        color='text.secondary'
        sx={{ mb: 1, fontWeight: 500 }}
      >
        Learn math through fun and colorful games!
      </Typography>
      <ChipList />
    </Box>
  );
};
