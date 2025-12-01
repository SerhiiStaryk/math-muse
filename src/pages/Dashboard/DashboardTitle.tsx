import { useSettings } from '@/context/SettingsContext';
import { Box, Typography, Button } from '@mui/material';
import { ResetConfirmationDialog } from './ResetConfirmationDialog';
import { useTranslation } from 'react-i18next';

type DashboardTitleProps = {
  hasAnyResults: boolean;
  setConfirmReset: (value: boolean) => void;
  confirmReset: boolean;
  handleReset: () => void;
};

export const DashboardTitle = ({ hasAnyResults, setConfirmReset, confirmReset, handleReset }: DashboardTitleProps) => {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant={settings.largeText ? 'h3' : 'h4'}
          sx={{ fontWeight: 700 }}
        >
          📊 {t('dashboard.yourProgressDashboard')}
        </Typography>
        {hasAnyResults && (
          <Button
            variant='outlined'
            color='error'
            onClick={() => setConfirmReset(true)}
            size={settings.largeText ? 'large' : 'medium'}
          >
            {t('dashboard.resetAllResults')}
          </Button>
        )}
      </Box>

      <ResetConfirmationDialog
        confirmReset={confirmReset}
        setConfirmReset={setConfirmReset}
        handleReset={handleReset}
      />
    </>
  );
};
