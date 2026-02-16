import { Box, Typography } from '@mui/material';
import { QuestionCard, GameProgress } from '@/components';
import { GameType } from '@/types';
import { useGameSession } from '@/hooks';
import { IncorrectAnswerDialog } from '@/components/IncorrectAnswerDialog';
import { SessionCompleteDialog } from '@/components/SessionCompleteDialog';

export const AddPage = () => {
  const {
    correctCount,
    totalCount,
    streak,
    question,
    isCorrect,
    useMultipleChoice,
    sessionComplete,
    showPopup,
    correctAnswer,
    handleAnswer,
    handleClosePopup,
    handleResetSession,
  } = useGameSession({
    gameType: GameType.add,
    questionType: 'add',
  });

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        ➕ Addition
      </Typography>
      <GameProgress
        correctCount={correctCount}
        totalCount={totalCount}
        streak={streak}
      />
      <QuestionCard
        question={question.question}
        answers={question.answers}
        isCorrect={isCorrect}
        onAnswer={handleAnswer}
        useMultipleChoice={useMultipleChoice}
      />
      <IncorrectAnswerDialog
        open={showPopup}
        correctAnswer={correctAnswer}
        onClose={handleClosePopup}
      />
      <SessionCompleteDialog
        correctCount={correctCount}
        totalCount={totalCount}
        streak={streak}
        sessionComplete={sessionComplete}
        handleResetSession={handleResetSession}
      />
    </Box>
  );
};
