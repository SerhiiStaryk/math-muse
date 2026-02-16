import { useState, useCallback, useEffect } from 'react';
import { useGameQuestion } from './useGameQuestion';
import { useSettings } from '@/context/SettingsContext';
import { GameType } from '@/types';
import { FEEDBACK_DISPLAY_DURATION } from '@/constants';

interface UseGameSessionProps {
  gameType: GameType;
  questionType: 'multiple' | 'divide' | 'add' | 'subtract';
}

export const useGameSession = ({ gameType, questionType }: UseGameSessionProps) => {
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
    gameType,
    questionType,
    autoAdvance: false,
  });

  const handleAnswer = useCallback(
    (value: number) => {
      if (showingFeedback || showPopup) return;

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
    [question.correct, handleGameAnswer, showingFeedback, showPopup]
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

  // Check if session is complete
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
    nextQuestion();
  }, [nextQuestion]);

  return {
    // Stats
    correctCount,
    totalCount,
    streak,
    
    // Game state
    question,
    isCorrect: showingFeedback ? true : isCorrect,
    useMultipleChoice,
    showingFeedback,
    
    // UI state
    sessionComplete,
    showPopup,
    correctAnswer,
    
    // Actions
    handleAnswer,
    handleClosePopup,
    handleResetSession,
  };
};
