import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardContent, TextField, Stack, Chip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt, masteredTasks } from '@/helpers';
import { GameType } from '@/types';
import { CustomNumericKeyboard, AnswerFeedback, ResponsiveBox } from '@/components';

type Position = 'first' | 'second' | 'result';
type Operation = '+' | '-' | 'x' | '÷';

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
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const mastered = masteredTasks(GameType.missingNumber);
    let attemptsCount = 0;
    const MAX_ATTEMPTS = 100;

    while (true) {
      attemptsCount++;
      const operations: Operation[] = ['+', '-', 'x', '÷'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      const positions: Position[] = ['first', 'second', 'result'];
      const missingPosition = positions[Math.floor(Math.random() * positions.length)];

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
        case 'x':
          num1 = Math.floor(Math.random() * settings.maxMultiplicationTable) + 1;
          num2 = Math.floor(Math.random() * settings.maxMultiplicationTable) + 1;
          result = num1 * num2;
          break;
        case '÷':
          num2 = Math.floor(Math.random() * settings.maxMultiplicationTable) + 1;
          result = Math.floor(Math.random() * 10) + 1; // Keeping quotient small for easier division
          num1 = num2 * result;
          break;
        default:
          num1 = 0;
          num2 = 0;
          result = 0;
      }

      const task = `${num1}${operation}${num2}`;
      if (mastered.has(task) && attemptsCount < MAX_ATTEMPTS) continue;

      const answer = missingPosition === 'first' ? num1 : missingPosition === 'second' ? num2 : result;

      setQuestion({ num1, num2, operation, missingPosition, answer });
      setUserAnswer('');
      setFeedback(null);
      break;
    }
  }, [settings.maxMissingNumber, settings.maxMultiplicationTable]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSubmit = () => {
    if (!question || userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === question.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(prev => prev + 1);

    // Record the attempt for statistics
    const taskDescription = `${question.num1}${question.operation}${question.num2}`;
    recordAttempt(taskDescription, isCorrect, GameType.missingNumber);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
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
      operation === '+' ? num1 + num2 : operation === '-' ? num1 - num2 : operation === 'x' ? num1 * num2 : num1 / num2;

    const fontSize = { xs: '1.75rem', sm: '2.5rem', md: '4rem' };

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, sm: 1, md: 2 },
          fontSize: fontSize,
          fontWeight: 700,
          justifyContent: 'center',
          flexWrap: 'wrap',
          px: { xs: 1, sm: 0 },
        }}
      >
        {missingPosition === 'first' ? (
          <ResponsiveBox
            size='medium'
            variant='dashed'
            highlight={true}
            color='primary'
          >
            <HelpOutlineIcon sx={{ fontSize }} />
          </ResponsiveBox>
        ) : (
          <Typography
            variant='h2'
            component='span'
            sx={{ fontSize, textAlign: 'center', flexShrink: 0 }}
          >
            {num1}
          </Typography>
        )}

        <Typography
          variant='h2'
          component='span'
          color='secondary'
          sx={{ fontSize, px: { xs: 0.25, sm: 0.5 }, flexShrink: 0 }}
        >
          {operation}
        </Typography>

        {missingPosition === 'second' ? (
          <ResponsiveBox
            size='medium'
            variant='dashed'
            highlight={true}
            color='primary'
          >
            <HelpOutlineIcon sx={{ fontSize }} />
          </ResponsiveBox>
        ) : (
          <Typography
            variant='h2'
            component='span'
            sx={{ fontSize, textAlign: 'center', flexShrink: 0 }}
          >
            {num2}
          </Typography>
        )}

        <Typography
          variant='h2'
          component='span'
          color='text.secondary'
          sx={{ fontSize, px: { xs: 0.25, sm: 0.5 }, flexShrink: 0 }}
        >
          =
        </Typography>

        {missingPosition === 'result' ? (
          <ResponsiveBox
            size='medium'
            variant='dashed'
            highlight={true}
            color='primary'
          >
            <HelpOutlineIcon sx={{ fontSize }} />
          </ResponsiveBox>
        ) : (
          <Typography
            variant='h2'
            component='span'
            sx={{ fontSize, textAlign: 'center', flexShrink: 0 }}
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
        variant='h4'
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <HelpOutlineIcon /> {t('games.missingNumber')}
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

      <Card
        sx={{
          mb: { xs: 1, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: { xs: 2, sm: 4, md: 6 }, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography
            variant='h6'
            gutterBottom
            color='text.secondary'
            sx={{ mb: { xs: 1, md: 2 } }}
          >
            {t('game.findMissingNumber')}
          </Typography>

          {renderEquation()}

          <Box
            sx={{
              mt: { xs: 2, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
            }}
          >
            <TextField
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              type='text'
              placeholder='?'
              autoFocus
              disabled={feedback === 'correct'}
              slotProps={{
                htmlInput: {
                  readOnly: true,
                  inputMode: 'none',
                },
              }}
              sx={{
                '& input': {
                  fontSize: '2rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  caretColor: 'transparent',
                },
                maxWidth: 400,
              }}
            />
            <Box sx={{ mt: { xs: 0, md: 2 }, width: '100%', maxWidth: 400 }}>
              <CustomNumericKeyboard
                onInput={num => {
                  if (userAnswer.length < 5) {
                    setUserAnswer(prev => prev + num.toString());
                  }
                }}
                onBackspace={() => setUserAnswer(prev => prev.slice(0, -1))}
                onToggleSign={() => {
                  setUserAnswer(prev => {
                    if (prev.startsWith('-')) return prev.slice(1);
                    return '-' + prev;
                  });
                }}
                onSubmit={handleSubmit}
                disabled={feedback === 'correct'}
              />
            </Box>
          </Box>

          <AnswerFeedback isCorrect={feedback === null ? null : feedback === 'correct'} />

          {feedback === 'incorrect' && (
            <Typography
              variant='body1'
              color='error'
              sx={{ mt: { xs: 1, md: 2 }, fontWeight: 700 }}
            >
              {t('game.theAnswerIs')} {question?.answer}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
