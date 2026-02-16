import { Box, Typography } from '@mui/material';
import { QuestionCard, GameProgress } from '@/components';
import { IncorrectAnswerDialog } from '@/components/IncorrectAnswerDialog';
import { SessionCompleteDialog } from '@/components/SessionCompleteDialog';
import { useGameSession } from '@/hooks';

interface GamePageLayoutProps {
  title: string;
  session: ReturnType<typeof useGameSession>;
}

export const GamePageLayout = ({ title, session }: GamePageLayoutProps) => {
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
  } = session;

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        {title}
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
