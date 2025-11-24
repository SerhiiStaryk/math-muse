import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt } from '@/helpers';
import { GameType } from '@/types';

type Position = 'first' | 'second' | 'result';
type Operation = '+' | '-' | '×' | '÷';

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  missingPosition: Position;
  answer: number;
}

export const MissingNumberPage = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const operations: Operation[] = ['+', '-', '×', '÷'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const positions: Position[] = ['first', 'second', 'result'];
    const missingPosition =
      positions[Math.floor(Math.random() * positions.length)];

    let num1: number, num2: number, result: number;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * settings.maxMissingNumber) + 1;
        num2 = Math.floor(Math.random() * settings.maxMissingNumber) + 1;
        result = num1 + num2;
        break;
      case '-':
        result = Math.floor(Math.random() * settings.maxMissingNumber) + 1;
        num2 = Math.floor(Math.random() * result) + 1;
        num1 = result + num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        result = num1 * num2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 10) + 1;
        result = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * result;
        break;
      default:
        num1 = 0;
        num2 = 0;
        result = 0;
    }

    const answer =
      missingPosition === 'first'
        ? num1
        : missingPosition === 'second'
        ? num2
        : result;

    setQuestion({ num1, num2, operation, missingPosition, answer });
    setUserAnswer('');
    setFeedback(null);
  }, [settings.maxMissingNumber]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSubmit = () => {
    if (!question || userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === question.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts((prev) => prev + 1);

    // Record the attempt for statistics
    const taskDescription = `${question.num1} ${question.operation} ${question.num2}`;
    recordAttempt(taskDescription, isCorrect, GameType.missingNumber);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      setStreak(0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const renderEquation = () => {
    if (!question) return null;

    const { num1, num2, operation, missingPosition } = question;
    const result =
      operation === '+'
        ? num1 + num2
        : operation === '-'
        ? num1 - num2
        : operation === '×'
        ? num1 * num2
        : num1 / num2;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          fontSize: '3rem',
          fontWeight: 700,
        }}
      >
        {missingPosition === 'first' ? (
          <Box
            sx={{
              width: 100,
              height: 100,
              border: '4px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.light',
              color: 'white',
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: '4rem' }} />
          </Box>
        ) : (
          <Typography
            variant="h2"
            component="span"
            sx={{ minWidth: 100, textAlign: 'center' }}
          >
            {num1}
          </Typography>
        )}

        <Typography variant="h2" component="span" color="secondary">
          {operation}
        </Typography>

        {missingPosition === 'second' ? (
          <Box
            sx={{
              width: 100,
              height: 100,
              border: '4px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.light',
              color: 'white',
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: '4rem' }} />
          </Box>
        ) : (
          <Typography
            variant="h2"
            component="span"
            sx={{ minWidth: 100, textAlign: 'center' }}
          >
            {num2}
          </Typography>
        )}

        <Typography variant="h2" component="span" color="text.secondary">
          =
        </Typography>

        {missingPosition === 'result' ? (
          <Box
            sx={{
              width: 100,
              height: 100,
              border: '4px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.light',
              color: 'white',
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: '4rem' }} />
          </Box>
        ) : (
          <Typography
            variant="h2"
            component="span"
            sx={{ minWidth: 100, textAlign: 'center' }}
          >
            {result}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <HelpOutlineIcon /> {t('games.missingNumber')}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip
          label={`${t('common.score')}: ${score}/${attempts}`}
          color="primary"
        />
        <Chip label={`${t('common.streak')}: ${streak}`} color="secondary" />
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Find the missing number:
          </Typography>

          {renderEquation()}

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TextField
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              type="number"
              placeholder="?"
              autoFocus
              disabled={feedback === 'correct'}
              sx={{
                '& input': {
                  fontSize: '2rem',
                  textAlign: 'center',
                  fontWeight: 700,
                },
                width: 200,
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={userAnswer === '' || feedback === 'correct'}
              sx={{ minWidth: 200 }}
            >
              {t('common.submit')}
            </Button>
          </Box>

          {feedback === 'correct' && (
            <Alert severity="success" sx={{ mt: 3 }}>
              {t('feedback.correct')}
            </Alert>
          )}

          {feedback === 'incorrect' && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {t('feedback.incorrect')} The answer is {question?.answer}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
