import { useSettings } from '@/context/SettingsContext';
import { Typography } from '@mui/material';

export const GameSectionTitle = () => {
  const { settings } = useSettings();

  return (
    <Typography
      variant={settings.largeText ? 'h4' : 'h5'}
      gutterBottom
      sx={{ fontWeight: 700, mb: 3 }}
    >
      🎮 Choose Your Game
    </Typography>
  );
};
