import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GamePageLayout } from '@/components';
import { useSettings } from '@/context/SettingsContext';
import { CONVERSIONS } from '@/constants/units';
import { GameType } from '@/types';
import { recordAttempt } from '@/helpers';
// Force type casting if needed or define interface matching GamePageLayout requirements

export const UnitConverterPage = () => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  // State
  const [question, setQuestion] = useState<{ question: string; answer: number; task: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showingFeedback, setShowingFeedback] = useState(false);

  // Generate Question Logic
  const generateNewQuestion = useCallback(() => {
    // 1. Pick conversion
    const conversion = CONVERSIONS[Math.floor(Math.random() * CONVERSIONS.length)];
    
    // 2. Logic based on difficulty (settings.maxNumber used as proxy for level/experience)
    // If we had explicit difficulty levels, we'd use them.
    // For now: Easy = no Reverse. Medium/Hard = Reverse allowed.
    const isMediumOrHard = (settings.maxNumber || 0) > 20; 
    const reverse = isMediumOrHard ? Math.random() > 0.5 : false;

    let value: number;
    let answer: number;
    let questionText = '';

    // Translation keys
    const fromLabel = t(`units.${conversion.from}`, conversion.from);
    const toLabel = t(`units.${conversion.to}`, conversion.to);

    if (reverse) {
      // Example: 1000 m = ? km
      // Logic: value (in smaller unit) = multiplier * factor
      // answer = multiplier (in larger unit)
      const multiplier = Math.floor(Math.random() * 10) + 1;
      value = multiplier * conversion.factor;
      answer = multiplier;
      questionText = `${value} ${toLabel} = ? ${fromLabel}`;
    } else {
      // Example: 5 km = ? m
      // Logic: value (larger unit) = multiplier
      // answer = value * factor
      const maxMultiplier = isMediumOrHard ? 50 : 10;
      value = Math.floor(Math.random() * maxMultiplier) + 1;
      answer = value * conversion.factor;
      questionText = `${value} ${fromLabel} = ? ${toLabel}`;
    }

    setQuestion({
        question: questionText,
        answer,
        task: reverse 
            ? `${value} ${conversion.to} -> ${conversion.from}`
            : `${value} ${conversion.from} -> ${conversion.to}`
    });
    setIsCorrect(null);
    setShowingFeedback(false);
  }, [t, settings.maxNumber]);

  // Initial load
  useEffect(() => {
      generateNewQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleAnswer = (val: number) => {
      if (!question || showingFeedback) return;
      const correct = val === question.answer;
      
      setTotalCount(c => c + 1);
      recordAttempt(question.task, correct, GameType.unitConverter);

      if (correct) {
          setCorrectCount(c => c + 1);
          setStreak(s => s + 1);
          setIsCorrect(true);
          setShowingFeedback(true);
          
          // Auto advance
          setTimeout(() => {
              generateNewQuestion();
          }, 1500);
      } else {
          setStreak(0);
          setIsCorrect(false);
          setShowPopup(true);
      }
  };

  const handleClosePopup = () => {
      setShowPopup(false);
      generateNewQuestion();
  };

  const handleResetSession = () => {
      setCorrectCount(0);
      setTotalCount(0);
      setStreak(0);
      setSessionComplete(false);
      generateNewQuestion();
  }

  // Session object adaptor for GamePageLayout
  // We explicitly match the expected structure
  const session: any = {
      correctCount,
      totalCount,
      streak,
      question: { question: question?.question || '', answers: [] },
      isCorrect, // showingFeedback ? true : isCorrect (handled by isCorrect logic above)
      useMultipleChoice: false, // Force numeric input
      sessionComplete,
      showPopup,
      correctAnswer: question?.answer || 0,
      handleAnswer,
      handleClosePopup,
      handleResetSession,
      showingFeedback
  };

  return (
    <GamePageLayout
      title={t('games.unitConverter')}
      session={session}
    />
  );
};
