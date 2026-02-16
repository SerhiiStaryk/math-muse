import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
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
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant='body1'>{t('game.correctAnswerWas')}</Typography>
          <Typography
            variant='h2'
            sx={{ my: 2, fontWeight: 'bold', color: 'primary.main' }}
          >
            {correctAnswer}
          </Typography>
          <Typography variant='body1'>{t('game.keepPracticing')}</Typography>
        </Box>
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
