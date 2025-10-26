import { motion } from 'framer-motion';
import { Typography } from '@mui/material';

type AnswerFeedbackProps = {
  isCorrect: boolean | null;
};

export const AnswerFeedback = ({ isCorrect }: AnswerFeedbackProps) => {
  if (isCorrect === null) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant='h5'
        color={isCorrect ? 'green' : 'red'}
        mt={3}
      >
        {isCorrect ? 'Correct! 🎉' : 'Try Again! ❌'}
      </Typography>
    </motion.div>
  );
};
