import { useSettings } from '@/context/SettingsContext';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const GameSectionTitle = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <Typography
      variant={settings.largeText ? 'h4' : 'h5'}
      gutterBottom
      sx={{ fontWeight: 700, mb: 3 }}
    >
      🎮 {t('home.gameSectionTitle')}
    </Typography>
  );
};
