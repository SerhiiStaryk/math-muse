import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ResetConfirmationDialogProps = {
  confirmReset: boolean;
  setConfirmReset: (value: boolean) => void;
  handleReset: () => void;
};

export const ResetConfirmationDialog = ({
  confirmReset,
  setConfirmReset,
  handleReset,
}: ResetConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={confirmReset}
      onClose={() => setConfirmReset(false)}
    >
      <DialogTitle>{t('dashboard.resetTitle')}</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>{t('dashboard.resetWarning')}</Typography>
        <Typography
          variant='body2'
          color='error'
          sx={{ mt: 2 }}
        >
          {t('dashboard.resetIrreversible')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmReset(false)}
          variant='outlined'
        >
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleReset}
          variant='contained'
          color='error'
        >
          {t('dashboard.resetButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
