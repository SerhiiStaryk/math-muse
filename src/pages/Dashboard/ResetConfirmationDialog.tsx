import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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
  return (
    <Dialog
      open={confirmReset}
      onClose={() => setConfirmReset(false)}
    >
      <DialogTitle>⚠️ Reset All Results?</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          Are you sure you want to reset all your progress? This will delete all your statistics, achievements, and
          mastered problems.
        </Typography>
        <Typography
          variant='body2'
          color='error'
          sx={{ mt: 2 }}
        >
          This action cannot be undone!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmReset(false)}
          variant='outlined'
        >
          Cancel
        </Button>
        <Button
          onClick={handleReset}
          variant='contained'
          color='error'
        >
          Reset Everything
        </Button>
      </DialogActions>
    </Dialog>
  );
};
