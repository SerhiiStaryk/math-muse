import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type IncorrectAnswerDialogProps = {
  open: boolean;
  correctAnswer: number | null;
  onClose: () => void;
};

export const IncorrectAnswerDialog = ({ open, correctAnswer, onClose }: IncorrectAnswerDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{t('game.tryAgain')}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {t('game.correctAnswerWas')}
          <Typography variant='h2'>{correctAnswer}</Typography>
          {t('game.keepPracticing')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          color='primary'
          variant='contained'
        >
          {t('common.next')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
