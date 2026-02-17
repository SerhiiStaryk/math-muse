import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardContent, TextField, Stack, Chip, Grid } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt, masteredTasks } from '@/helpers';
import { GameType } from '@/types';
import { CustomNumericKeyboard, AnswerFeedback, ResponsiveBox } from '@/components';

interface Question {
  sequence: (number | null)[];
  step: number;
  answer: number;
  missingIndex: number;
}

export const NumberSequencePage = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const mastered = masteredTasks(GameType.numberSequence);
    let attemptsCount = 0;
    const MAX_ATTEMPTS = 100;

    while (true) {
      attemptsCount++;
      // Generate step (difference between numbers)
      const steps = [1, 2, 3, 5, 10, -1, -2, -3, -5];
      const step = steps[Math.floor(Math.random() * steps.length)];

      // Generate starting number
      const maxStart = Math.min(settings.maxSequenceNumber, 50);
      const start = Math.floor(Math.random() * maxStart) + 1;

      // Generate sequence based on settings
      const length = settings.sequenceLength || 5;
      const fullSequence = Array.from({ length }, (_, i) => start + step * i);

      // Make sure all numbers are positive and within reasonable range
      if (fullSequence.some(n => n < 0 || n > settings.maxSequenceNumber)) {
        if (attemptsCount < MAX_ATTEMPTS) continue;
      }

      // Choose which number to hide (not first or last to make it easier)
      const missingIndex = Math.floor(Math.random() * (length - 2)) + 1;
      const answer = fullSequence[missingIndex];
      const sequence = fullSequence.map((n, i) => (i === missingIndex ? null : n));

      const task = `Step ${step}, Start ${start}, Pos ${missingIndex}`;
      if (mastered.has(task) && attemptsCount < MAX_ATTEMPTS) continue;

      setQuestion({ sequence, step, answer, missingIndex });
      setUserAnswer('');
      setFeedback(null);
      break;
    }
  }, [settings.maxSequenceNumber, settings.sequenceLength]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSubmit = () => {
    if (!question || userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === question.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Record the attempt for statistics
    const taskDescription = `Step ${question.step}, Start ${question.sequence[0] || question.answer}, Pos ${question.missingIndex}`;
    recordAttempt(taskDescription, isCorrect, GameType.numberSequence);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const getPatternHint = () => {
    if (!question) return '';
    if (question.step > 0) {
      return t('game.addingMsg', { step: question.step });
    } else {
      return t('game.subtractingMsg', { step: Math.abs(question.step) });
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <FormatListNumberedIcon /> {t('games.numberSequence')}
      </Typography>

      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: { xs: 2, sm: 4 } }}
      >
        <Chip
          icon={<HelpOutlineIcon />}
          label={`${t('common.score')}: ${score}`}
          color='primary'
          variant='outlined'
        />
        <Chip
          label={`${t('common.streak')}: ${streak} 🔥`}
          color='warning'
          variant={streak > 0 ? 'filled' : 'outlined'}
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
              {t('game.findSequenceMissing')}
            </Typography>

            <Grid
              container
              spacing={{ xs: 0.5, sm: 1, md: 2 }}
              justifyContent='center'
              sx={{ my: { xs: 2, sm: 4 } }}
            >
              {question.sequence.map((num, index) => (
                <Grid
                  key={index}
                  size='auto'
                >
                  {num === null ? (
                    <ResponsiveBox
                      size='medium'
                      variant='dashed'
                      highlight={true}
                      color='primary'
                    >
                      ?
                    </ResponsiveBox>
                  ) : (
                    <ResponsiveBox
                      size='medium'
                      variant='solid'
                      color='secondary'
                    >
                      {num}
                    </ResponsiveBox>
                  )}
                </Grid>
              ))}
            </Grid>

            {settings.enableHints && feedback === null && (
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mb: 3, fontStyle: 'italic' }}
              >
                💡 {t('game.hint')}: {getPatternHint()}
              </Typography>
            )}

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

              <Box sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
                <CustomNumericKeyboard
                  onInput={num => {
                    if (userAnswer.length < 5) {
                      // Limit length
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
                sx={{ mt: 2, fontWeight: 700 }}
              >
                {t('game.theAnswerIs')} {question.answer}. {getPatternHint()}.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
