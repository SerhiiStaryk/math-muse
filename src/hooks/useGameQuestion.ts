import { useState, useMemo, useCallback, useEffect } from 'react';
import { masteredTasks, recordAttempt, generateQuestion } from '@/helpers';
import { GameType } from '@/types';
import { useSettings } from '@/context/SettingsContext';
import { FEEDBACK_DISPLAY_DURATION } from '@/constants';

type UseGameQuestionProps = {
  gameType: GameType;
  questionType: 'multiple' | 'divide' | 'add' | 'subtract';
  autoAdvance?: boolean;
};

export const useGameQuestion = ({ gameType, questionType, autoAdvance = true }: UseGameQuestionProps) => {
  const [seed, setSeed] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { settings } = useSettings();

  const mastered = useMemo(() => masteredTasks(gameType), [gameType]);

  const question = useMemo(
    () =>
      generateQuestion({
        mastered,
        useMultipleChoice: settings.useMultipleChoice,
        type: questionType,
        maxNumber: settings.maxNumber,
        maxMultiplicationTable: settings.maxMultiplicationTable,
        maxDivisionNumber: settings.maxDivisionNumber,
      }),
    // seed is intentionally included to force question regeneration
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      seed,
      settings.useMultipleChoice,
      settings.maxNumber,
      settings.maxMultiplicationTable,
      settings.maxDivisionNumber,
      mastered,
      questionType,
    ]
  );

  // Clear feedback and generate next question after delay
  useEffect(() => {
    if (isCorrect !== null && autoAdvance && settings.autoAdvanceOnCorrect) {
      const timer = setTimeout(() => {
        setIsCorrect(null);
        setSeed(s => s + 1);
      }, FEEDBACK_DISPLAY_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, autoAdvance, settings.autoAdvanceOnCorrect]);

  const handleAnswer = useCallback(
    (value: number) => {
      const correct = value === question.correct;
      recordAttempt(question.task, correct, gameType);
      setIsCorrect(correct);
    },
    [question.correct, question.task, gameType]
  );

  const nextQuestion = useCallback(() => {
    setSeed(s => s + 1);
    setIsCorrect(null);
  }, []);

  return {
    question,
    isCorrect,
    handleAnswer,
    nextQuestion,
    useMultipleChoice: settings.useMultipleChoice,
  };
};
