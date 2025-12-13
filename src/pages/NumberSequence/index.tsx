import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardContent, TextField, Stack, Chip, Alert, Grid } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt } from '@/helpers';
import { GameType } from '@/types';
import { CustomNumericKeyboard } from '@/components';

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
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
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
      // Try again with a different start
      const newStart = step > 0 ? Math.floor(Math.random() * 20) + 1 : Math.floor(Math.random() * 50) + 50;
      const newSequence = Array.from({ length }, (_, i) => newStart + step * i);

      if (newSequence.every(n => n >= 0 && n <= settings.maxSequenceNumber)) {
        const missingIndex = Math.floor(Math.random() * 3) + 1; // Don't hide first or last
        const answer = newSequence[missingIndex];
        const sequence = newSequence.map((n, i) => (i === missingIndex ? null : n));

        setQuestion({ sequence, step, answer, missingIndex });
        setUserAnswer('');
        setFeedback(null);
        return;
      }
    }

    // Choose which number to hide (not first or last to make it easier)
    const missingIndex = Math.floor(Math.random() * 3) + 1;
    const answer = fullSequence[missingIndex];
    const sequence = fullSequence.map((n, i) => (i === missingIndex ? null : n));

    setQuestion({ sequence, step, answer, missingIndex });
    setUserAnswer('');
    setFeedback(null);
  }, [settings.maxSequenceNumber, settings.sequenceLength]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSubmit = () => {
    if (!question || userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === question.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts(prev => prev + 1);

    // Record the attempt for statistics
    const taskDescription = `Sequence with step ${question.step > 0 ? '+' : ''}${question.step}`;
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
      return `Adding ${question.step} each time`;
    } else {
      return `Subtracting ${Math.abs(question.step)} each time`;
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
              Find the missing number in the sequence:
            </Typography>

            <Grid
              container
              spacing={2}
              justifyContent='center'
              sx={{ my: 4 }}
            >
              {question.sequence.map((num, index) => (
                <Grid key={index}>
                  {num === null ? (
                    <Box
                      sx={{
                        width: { xs: 50, sm: 100 },
                        height: { xs: 50, sm: 100 },
                        border: '4px dashed',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'primary.light',
                        fontSize: { xs: '2rem', sm: '3rem' },
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      ?
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: { xs: 50, sm: 100 },
                        height: { xs: 50, sm: 100 },
                        border: '3px solid',
                        borderColor: 'secondary.main',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'secondary.light',
                        fontSize: { xs: '1.5rem', sm: '2.5rem' },
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      {num}
                    </Box>
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
                💡 Hint: {getPatternHint()}
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
                type='text' // Changed from number to allow inputMode none effect if needed, but readOnly handles it
                placeholder='?'
                autoFocus
                disabled={feedback === 'correct'}
                slotProps={{
                  htmlInput: {
                    readOnly: true, // Prevent native keyboard
                    inputMode: 'none',
                  },
                }}
                sx={{
                  '& input': {
                    fontSize: '2rem',
                    textAlign: 'center',
                    fontWeight: 700,
                    caretColor: 'transparent', // Hide cursor content
                  },
                  width: 200,
                }}
              />

              <Box sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
                <CustomNumericKeyboard
                  onInput={num => {
                    if (userAnswer.length < 5) { // Limit length
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

            {feedback === 'correct' && (
              <Alert
                severity='success'
                sx={{ mt: 3 }}
              >
                {t('feedback.correct')} Great pattern recognition! 🎉
              </Alert>
            )}

            {feedback === 'incorrect' && (
              <Alert
                severity='error'
                sx={{ mt: 3 }}
              >
                {t('feedback.incorrect')} The answer is {question.answer}. {getPatternHint()}.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
