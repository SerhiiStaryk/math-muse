import { useSettings } from '@/context/SettingsContext';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const NoResults = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <Alert
      severity='info'
      sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
    >
      {t('dashboard.noResults')}
    </Alert>
  );
};
