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
  Grid,
} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt } from '@/helpers';
import { GameType } from '@/types';

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
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(
    null
  );
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
    if (fullSequence.some((n) => n < 0 || n > settings.maxSequenceNumber)) {
      // Try again with a different start
      const newStart =
        step > 0
          ? Math.floor(Math.random() * 20) + 1
          : Math.floor(Math.random() * 50) + 50;
      const newSequence = Array.from({ length }, (_, i) => newStart + step * i);

      if (newSequence.every((n) => n >= 0 && n <= settings.maxSequenceNumber)) {
        const missingIndex = Math.floor(Math.random() * 3) + 1; // Don't hide first or last
        const answer = newSequence[missingIndex];
        const sequence = newSequence.map((n, i) =>
          i === missingIndex ? null : n
        );

        setQuestion({ sequence, step, answer, missingIndex });
        setUserAnswer('');
        setFeedback(null);
        return;
      }
    }

    // Choose which number to hide (not first or last to make it easier)
    const missingIndex = Math.floor(Math.random() * 3) + 1;
    const answer = fullSequence[missingIndex];
    const sequence = fullSequence.map((n, i) =>
      i === missingIndex ? null : n
    );

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
    setAttempts((prev) => prev + 1);

    // Record the attempt for statistics
    const taskDescription = `Sequence with step ${question.step > 0 ? '+' : ''}${question.step}`;
    recordAttempt(taskDescription, isCorrect, GameType.numberSequence);

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

  const handleKeyPress = (e: any) => {
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
        variant="h4"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <FormatListNumberedIcon /> {t('games.numberSequence')}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip
          label={`${t('common.score')}: ${score}/${attempts}`}
          color="primary"
        />
        <Chip label={`${t('common.streak')}: ${streak}`} color="secondary" />
      </Stack>

      {question && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Find the missing number in the sequence:
            </Typography>

            <Grid container spacing={2} justifyContent="center" sx={{ my: 4 }}>
              {question.sequence.map((num, index) => (
                <Grid item key={index}>
                  {num === null ? (
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
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      ?
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: '3px solid',
                        borderColor: 'secondary.main',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'secondary.light',
                        fontSize: '2.5rem',
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
                variant="body2"
                color="text.secondary"
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
                {t('feedback.correct')} Great pattern recognition! 🎉
              </Alert>
            )}

            {feedback === 'incorrect' && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {t('feedback.incorrect')} The answer is {question.answer}.{' '}
                {getPatternHint()}.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
