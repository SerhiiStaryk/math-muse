import { useMemo, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { QuestionCard } from '@/components';
import { recordAttempt, masteredTasks, loadSettings, generateQuestion } from '@/helpers';
import { GameType } from '@/types';

export const MultiplyPage = () => {
  const [seed, setSeed] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    setSettings(loadSettings());
  }, [seed]);

  const mastered = useMemo(() => masteredTasks(GameType.multiply), []);

  const q = useMemo(() => {
    if (isCorrect === true) {
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    }

    return generateQuestion({ mastered, useMultipleChoice: settings.useMultipleChoice, type: 'multiple' });
  }, [seed, settings.useMultipleChoice]);

  const handleAnswer = (value: number) => {
    const correct = value === q.correct;

    recordAttempt(q.task, correct, GameType.multiply);

    if (correct) {
      setSeed(s => s + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        Multiply
      </Typography>
      <QuestionCard
        question={q.question}
        answers={q.answers}
        isCorrect={isCorrect}
        onAnswer={handleAnswer}
        useMultipleChoice={settings.useMultipleChoice}
      />
    </Box>
  );
};
