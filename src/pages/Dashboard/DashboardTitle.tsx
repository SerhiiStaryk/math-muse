import { useSettings } from '@/context/SettingsContext';
import { Box, Typography, Button } from '@mui/material';
import { ResetConfirmationDialog } from './ResetConfirmationDialog';

type DashboardTitleProps = {
  hasAnyResults: boolean;
  setConfirmReset: (value: boolean) => void;
  confirmReset: boolean;
  handleReset: () => void;
};

export const DashboardTitle = ({ hasAnyResults, setConfirmReset, confirmReset, handleReset }: DashboardTitleProps) => {
  const { settings } = useSettings();

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
          📊 Your Progress Dashboard
        </Typography>
        {hasAnyResults && (
          <Button
            variant='outlined'
            color='error'
            onClick={() => setConfirmReset(true)}
            size={settings.largeText ? 'large' : 'medium'}
          >
            Reset All Results
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
