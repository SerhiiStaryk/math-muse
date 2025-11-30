import { useSettings } from '@/context/SettingsContext';
import { Alert } from '@mui/material';

export const NoResults = () => {
  const { settings } = useSettings();

  return (
    <Alert
      severity='info'
      sx={{ mb: 3, fontSize: settings.largeText ? '1.2rem' : '1rem' }}
    >
      🎯 Start playing games to see your progress here! Your achievements, statistics, and mastered problems will appear
      on this dashboard.
    </Alert>
  );
};
