import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import { QuestionCard, GameProgress } from '@/components';
import { GameType } from '@/types';
import { useGameQuestion } from '@/hooks';
import { useSettings } from '@/context/SettingsContext';
import { FEEDBACK_DISPLAY_DURATION } from '@/constants';

export const DividePage = () => {
  const { settings } = useSettings();
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [showingFeedback, setShowingFeedback] = useState(false);

  const {
    question,
    isCorrect,
    handleAnswer: handleGameAnswer,
    nextQuestion,
    useMultipleChoice,
  } = useGameQuestion({
    gameType: GameType.divide,
    questionType: 'divide',
    autoAdvance: false,
  });

  const handleAnswer = useCallback(
    (value: number) => {
      const correct = value === question.correct;
      handleGameAnswer(value);

      // Track stats
      setTotalCount(prev => prev + 1);
      if (correct) {
        setCorrectCount(prev => prev + 1);
        setStreak(prev => prev + 1);
        setShowingFeedback(true);
      } else {
        setStreak(0);
        // Show popup for incorrect answers
        setCorrectAnswer(question.correct);
        setShowPopup(true);
      }
    },
    [question.correct, handleGameAnswer]
  );

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
    setCorrectAnswer(null);
    nextQuestion();
  }, [nextQuestion]);

  // Auto-advance to next question after showing correct feedback
  useEffect(() => {
    if (showingFeedback && settings.autoAdvanceOnCorrect) {
      const timer = setTimeout(() => {
        setShowingFeedback(false);
        nextQuestion();
      }, FEEDBACK_DISPLAY_DURATION);
      return () => clearTimeout(timer);
    }
  }, [showingFeedback, nextQuestion, settings.autoAdvanceOnCorrect]);

  useEffect(() => {
    if (settings.questionsPerSession > 0 && totalCount >= settings.questionsPerSession) {
      setSessionComplete(true);
    }
  }, [totalCount, settings.questionsPerSession]);

  const handleResetSession = useCallback(() => {
    setCorrectCount(0);
    setTotalCount(0);
    setStreak(0);
    setSessionComplete(false);
  }, []);

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        ➗ Division
      </Typography>

      <GameProgress
        correctCount={correctCount}
        totalCount={totalCount}
        streak={streak}
      />

      <QuestionCard
        question={question.question}
        answers={question.answers}
        isCorrect={showingFeedback ? true : isCorrect}
        onAnswer={handleAnswer}
        useMultipleChoice={useMultipleChoice}
      />

      {/* Incorrect Answer Dialog */}
      <Dialog
        open={showPopup}
        onClose={handleClosePopup}
      >
        <DialogTitle>Try Again!</DialogTitle>
        <DialogContent>
          <DialogContentText>The correct answer was {correctAnswer}. Keep practicing!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClosePopup}
            color='primary'
            variant='contained'
          >
            Next Question
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};
