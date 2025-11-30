import { Box, Grid } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { StyledUtilitiesSectionTitle } from './styles';
import { UtilityCard } from './UtilityCard';
import { UTILITY_CARDS } from './constants';

export const UtilitiesSection = () => {
  const { settings } = useSettings();

  return (
    <Box sx={{ mb: 4 }}>
      <StyledUtilitiesSectionTitle
        variant={settings.largeText ? 'h4' : 'h5'}
        gutterBottom
      >
        🔧 Tools & Settings
      </StyledUtilitiesSectionTitle>
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
