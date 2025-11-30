import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';

type IncorrectAnswerDialogProps = {
  open: boolean;
  correctAnswer: number | null;
  onClose: () => void;
};

export const IncorrectAnswerDialog = ({ open, correctAnswer, onClose }: IncorrectAnswerDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Try Again!</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          The correct answer was
          <Typography variant='h2'>{correctAnswer}</Typography>
          Keep practicing!
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          color='primary'
          variant='contained'
        >
          Next Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};
