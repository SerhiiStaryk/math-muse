import { useSettings } from '@/context/SettingsContext';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Dialog
      open={sessionComplete}
      onClose={handleResetSession}
    >
      <DialogTitle>🎉 {t('game.sessionComplete')}</DialogTitle>
      <DialogContent>
        <Typography
          variant='body1'
          gutterBottom
        >
          {t('game.sessionQuestions', { count: settings.questionsPerSession })}
        </Typography>
        <Typography
          variant='h6'
          color='primary'
          sx={{ mt: 2 }}
        >
          {t('common.score')}: {correctCount} / {totalCount} ({Math.round((correctCount / totalCount) * 100)}%)
        </Typography>
        {streak > 3 && (
          <Typography
            variant='body2'
            color='success.main'
            sx={{ mt: 1 }}
          >
            {t('game.bestStreak', { streak })}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleResetSession}
          variant='contained'
          color='primary'
        >
          {t('game.playAgain')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
