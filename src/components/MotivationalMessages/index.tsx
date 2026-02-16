import { useSettings } from '@/context/SettingsContext';
import type { Stats } from '@/types';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

type MotivationalMessagesProps = {
  stats: Stats;
};

export const MotivationalMessages = ({ stats }: MotivationalMessagesProps) => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <>
      {stats.accuracy >= 90 && (
        <Alert
          severity='success'
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          {t('dashboard.motivationAccuracyHigh')}
        </Alert>
      )}
      {stats.accuracy >= 70 && stats.accuracy < 90 && (
        <Alert
          severity='info'
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          {t('dashboard.motivationAccuracyMedium')}
        </Alert>
      )}
      {stats.totalMastered >= 20 && (
        <Alert
          severity='success'
          sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
        >
          {t('dashboard.motivationMastered', { count: stats.totalMastered })}
        </Alert>
      )}
    </>
  );
};
