import { Box, Typography, Grid } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { UtilityCard } from './UtilityCard';
import { UTILITY_CARDS } from './constants';

export const UtilitiesSection = () => {
  const { settings } = useSettings();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant={settings.largeText ? 'h4' : 'h5'}
        gutterBottom
        sx={{ fontWeight: 700, mb: 3 }}
      >
        🔧 Tools & Settings
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {UTILITY_CARDS.map(card => (
          <UtilityCard
            key={card.path}
            card={card}
          />
        ))}
      </Grid>
    </Box>
  );
};
