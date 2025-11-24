import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Card, CardContent, Stack, Chip, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt } from '@/helpers';
import { GameType } from '@/types';

type Operation = '+' | '-' | '×' | '÷';

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  displayedResult: number;
  correctResult: number;
  isCorrect: boolean;
}

export const TrueFalsePage = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const operations: Operation[] = ['+', '-', '×', '÷'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1: number, num2: number, correctResult: number;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * settings.maxTrueFalseNumber) + 1;
        num2 = Math.floor(Math.random() * settings.maxTrueFalseNumber) + 1;
        correctResult = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * settings.maxTrueFalseNumber) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        correctResult = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        correctResult = num1 * num2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 12) + 1;
        correctResult = Math.floor(Math.random() * 12) + 1;
        num1 = num2 * correctResult;
        break;
      default:
        num1 = 0;
        num2 = 0;
        correctResult = 0;
    }

    // 50% chance to show correct answer, 50% to show wrong answer
    const showCorrectAnswer = Math.random() > 0.5;
    const displayedResult = showCorrectAnswer
      ? correctResult
      : correctResult + (Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 5) - 1);

    setQuestion({
      num1,
      num2,
      operation,
      displayedResult,
      correctResult,
      isCorrect: showCorrectAnswer,
    });
    setFeedback(null);
  }, [settings.maxTrueFalseNumber]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (userSaysTrue: boolean) => {
    if (!question) return;

    const isCorrect = userSaysTrue === question.isCorrect;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(prev => prev + 1);

    // Record the attempt for statistics
    const taskDescription = `${question.num1} ${question.operation} ${question.num2} = ${question.displayedResult}`;
    recordAttempt(taskDescription, isCorrect, GameType.trueFalse);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  const getOperationSymbol = (op: Operation) => {
    return op;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <CheckCircleOutlineIcon /> {t('games.trueFalse')}
      </Typography>

      <Stack
        direction='row'
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Chip
          label={`${t('common.score')}: ${score}/${attempts}`}
          color='primary'
        />
        <Chip
          label={`${t('common.streak')}: ${streak}`}
          color='secondary'
        />
      </Stack>

      {question && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography
              variant='h6'
              gutterBottom
              color='text.secondary'
            >
              Is this equation correct?
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                fontSize: '4rem',
                fontWeight: 700,
                my: 4,
              }}
            >
              <Typography
                variant='h1'
                component='span'
              >
                {question.num1}
              </Typography>
              <Typography
                variant='h1'
                component='span'
                color='secondary.main'
              >
                {getOperationSymbol(question.operation)}
              </Typography>
              <Typography
                variant='h1'
                component='span'
              >
                {question.num2}
              </Typography>
              <Typography
                variant='h1'
                component='span'
                color='text.secondary'
              >
                =
              </Typography>
              <Typography
                variant='h1'
                component='span'
                sx={{
                  color: feedback === null ? 'text.primary' : feedback === 'correct' ? 'success.main' : 'error.main',
                  fontWeight: 800,
                }}
              >
                {question.displayedResult}
              </Typography>
            </Box>

            {feedback === null && (
              <Stack
                direction='row'
                spacing={3}
                justifyContent='center'
                sx={{ mt: 4 }}
              >
                <Button
                  variant='contained'
                  size='large'
                  color='success'
                  startIcon={<ThumbUpIcon />}
                  onClick={() => handleAnswer(true)}
                  sx={{
                    minWidth: 200,
                    py: 2,
                    fontSize: '1.2rem',
                  }}
                >
                  True ✓
                </Button>
                <Button
                  variant='contained'
                  size='large'
                  color='error'
                  startIcon={<ThumbDownIcon />}
                  onClick={() => handleAnswer(false)}
                  sx={{
                    minWidth: 200,
                    py: 2,
                    fontSize: '1.2rem',
                  }}
                >
                  False ✗
                </Button>
              </Stack>
            )}

            {feedback === 'correct' && (
              <Alert
                severity='success'
                sx={{ mt: 3 }}
                icon={<CheckCircleOutlineIcon />}
              >
                {t('feedback.correct')}
              </Alert>
            )}

            {feedback === 'incorrect' && (
              <Alert
                severity='error'
                sx={{ mt: 3 }}
                icon={<CancelIcon />}
              >
                {t('feedback.incorrect')} The correct answer is {question.correctResult}
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
