import { Box, Grid } from '@mui/material';
import { useSettings } from '@/context/SettingsContext';
import { StyledUtilitiesSectionTitle } from './styles';
import { UtilityCard } from './UtilityCard';
import { UTILITY_CARDS } from './constants';
import { useTranslation } from 'react-i18next';

export const UtilitiesSection = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>
      <StyledUtilitiesSectionTitle
        variant={settings.largeText ? 'h4' : 'h5'}
        gutterBottom
      >
        🔧 {t('home.toolsSettings')}
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
