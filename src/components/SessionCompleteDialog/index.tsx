import { useSettings } from '@/context/SettingsContext';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type SessionCompleteDialogProps = {
  correctCount: number;
  totalCount: number;
  streak: number;
  sessionComplete: boolean;
  handleResetSession: () => void;
};

export const SessionCompleteDialog = ({
  correctCount,
  totalCount,
  streak,
  sessionComplete,
  handleResetSession,
}: SessionCompleteDialogProps) => {
  const { settings } = useSettings();

  return (
    <Dialog
      open={sessionComplete}
      onClose={handleResetSession}
    >
      <DialogTitle>🎉 Session Complete!</DialogTitle>
      <DialogContent>
        <Typography
          variant='body1'
          gutterBottom
        >
          Great job! You completed {settings.questionsPerSession} questions!
        </Typography>
        <Typography
          variant='h6'
          color='primary'
          sx={{ mt: 2 }}
        >
          Score: {correctCount} / {totalCount} ({Math.round((correctCount / totalCount) * 100)}%)
        </Typography>
        {streak > 3 && (
          <Typography
            variant='body2'
            color='success.main'
            sx={{ mt: 1 }}
          >
            🔥 Best streak: {streak} in a row!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleResetSession}
          variant='contained'
          color='primary'
        >
          Play Again
        </Button>
      </DialogActions>
    </Dialog>
  );
};
