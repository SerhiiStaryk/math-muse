import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  Alert,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { recordAttempt } from '@/helpers';
import { GameType } from '@/types';

type QuestionType = 'read-clock' | 'time-difference' | 'add-time';

interface TimeQuestion {
  type: QuestionType;
  hours: number;
  minutes: number;
  hours2?: number;
  minutes2?: number;
  answer: string;
  displayText: string;
}

// Analog Clock Component
const AnalogClock = ({
  hours,
  minutes,
  size = 200,
}: {
  hours: number;
  minutes: number;
  size?: number;
}) => {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '4px solid',
        borderColor: 'primary.main',
        position: 'relative',
        backgroundColor: 'background.paper',
        boxShadow: 3,
      }}
    >
      {/* Clock face markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = size / 2 + size * 0.38 * Math.cos(angle);
        const y = size / 2 + size * 0.38 * Math.sin(angle);
        return (
          <Typography
            key={i}
            sx={{
              position: 'absolute',
              left: x - 10,
              top: y - 12,
              fontSize: size > 150 ? '1.2rem' : '1rem',
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            {i === 0 ? 12 : i}
          </Typography>
        );
      })}

      {/* Hour hand */}
      <Box
        sx={{
          position: 'absolute',
          width: 6,
          height: size * 0.25,
          backgroundColor: 'text.primary',
          left: '50%',
          bottom: '50%',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${hourAngle}deg)`,
          borderRadius: 1,
        }}
      />

      {/* Minute hand */}
      <Box
        sx={{
          position: 'absolute',
          width: 4,
          height: size * 0.35,
          backgroundColor: 'primary.main',
          left: '50%',
          bottom: '50%',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
          borderRadius: 1,
        }}
      />

      {/* Center dot */}
      <Box
        sx={{
          position: 'absolute',
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: 'error.main',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  );
};

export const TimeChallengePage = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [question, setQuestion] = useState<TimeQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [userHours, setUserHours] = useState('');
  const [userMinutes, setUserMinutes] = useState('');
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const types: QuestionType[] = ['read-clock', 'time-difference', 'add-time'];
    const type = types[Math.floor(Math.random() * types.length)];

    let hours: number, minutes: number, hours2: number, minutes2: number;
    let answer: string, displayText: string;

    switch (type) {
      case 'read-clock':
        // Simple clock reading
        hours = Math.floor(Math.random() * 12) + 1;
        minutes = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ... 55
        answer = `${hours}:${minutes.toString().padStart(2, '0')}`;
        displayText = 'What time does the clock show?';
        break;

      case 'time-difference':
        // Calculate time difference
        hours = Math.floor(Math.random() * 12) + 1;
        minutes = Math.floor(Math.random() * 12) * 5;
        const addHours = Math.floor(Math.random() * 3) + 1;
        const addMinutes = Math.floor(Math.random() * 6) * 10;

        const totalMinutes = hours * 60 + minutes + addHours * 60 + addMinutes;
        hours2 = Math.floor((totalMinutes / 60) % 12);
        if (hours2 === 0) hours2 = 12;
        minutes2 = totalMinutes % 60;

        const diffHours = Math.floor((addHours * 60 + addMinutes) / 60);
        const diffMinutes = (addHours * 60 + addMinutes) % 60;
        answer =
          diffMinutes === 0
            ? `${diffHours}`
            : `${diffHours}:${diffMinutes.toString().padStart(2, '0')}`;
        displayText = `How much time passed?`;
        break;

      case 'add-time':
        // Add time to a clock
        hours = Math.floor(Math.random() * 12) + 1;
        minutes = Math.floor(Math.random() * 12) * 5;
        const hoursToAdd = Math.floor(Math.random() * 2) + 1;
        const minutesToAdd = Math.floor(Math.random() * 6) * 10;

        const newTotalMinutes =
          hours * 60 + minutes + hoursToAdd * 60 + minutesToAdd;
        const newHours = Math.floor((newTotalMinutes / 60) % 12);
        const newMinutes = newTotalMinutes % 60;

        answer = `${newHours === 0 ? 12 : newHours}:${newMinutes
          .toString()
          .padStart(2, '0')}`;
        displayText = `Add ${hoursToAdd} hour${
          hoursToAdd > 1 ? 's' : ''
        } and ${minutesToAdd} minutes`;
        hours2 = hoursToAdd;
        minutes2 = minutesToAdd;
        break;

      default:
        hours = 3;
        minutes = 0;
        answer = '3:00';
        displayText = 'What time does the clock show?';
    }

    setQuestion({
      type,
      hours,
      minutes,
      hours2,
      minutes2,
      answer,
      displayText,
    });
    setUserAnswer('');
    setUserHours('');
    setUserMinutes('');
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSubmit = () => {
    if (!question) return;

    let userResponse = '';
    if (question.type === 'read-clock' || question.type === 'add-time') {
      if (userHours === '' || userMinutes === '') return;
      userResponse = `${parseInt(userHours)}:${userMinutes.padStart(2, '0')}`;
    } else {
      if (userAnswer === '') return;
      userResponse = userAnswer;
    }

    const isCorrect = userResponse === question.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAttempts((prev) => prev + 1);

    // Record the attempt for statistics
    const taskDescription = `${question.type}: ${question.displayText}`;
    recordAttempt(taskDescription, isCorrect, GameType.timeChallenge);

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

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <AccessTimeIcon /> {t('games.timeChallenge')}
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
            <Typography
              variant="h6"
              gutterBottom
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              {question.displayText}
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Box>
                <AnalogClock
                  hours={question.hours}
                  minutes={question.minutes}
                  size={220}
                />
                {question.type === 'time-difference' &&
                  question.hours2 !== undefined && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      Start Time
                    </Typography>
                  )}
              </Box>

              {question.type === 'time-difference' &&
                question.hours2 !== undefined &&
                question.minutes2 !== undefined && (
                  <>
                    <Typography variant="h3" color="primary.main">
                      →
                    </Typography>
                    <Box>
                      <AnalogClock
                        hours={question.hours2}
                        minutes={question.minutes2}
                        size={220}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 1 }}
                      >
                        End Time
                      </Typography>
                    </Box>
                  </>
                )}

              {question.type === 'add-time' &&
                question.hours2 !== undefined &&
                question.minutes2 !== undefined && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h5"
                      color="secondary.main"
                      sx={{ fontWeight: 700 }}
                    >
                      +
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                      {question.hours2}h {question.minutes2}m
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      What time will it be?
                    </Typography>
                  </Box>
                )}
            </Stack>

            <Box
              sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {question.type === 'time-difference' ? (
                <TextField
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Hours or H:MM"
                  autoFocus
                  disabled={feedback === 'correct'}
                  sx={{
                    '& input': {
                      fontSize: '2rem',
                      textAlign: 'center',
                      fontWeight: 700,
                    },
                    width: 250,
                  }}
                  helperText="Enter hours or hours:minutes (e.g., 2 or 2:30)"
                />
              ) : (
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    value={userHours}
                    onChange={(e) => setUserHours(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type="number"
                    placeholder="H"
                    autoFocus
                    disabled={feedback === 'correct'}
                    inputProps={{ min: 1, max: 12 }}
                    sx={{
                      '& input': {
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontWeight: 700,
                        MozAppearance: 'textfield',
                      },
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: 'none',
                          margin: 0,
                        },
                      width: 100,
                    }}
                  />
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    :
                  </Typography>
                  <TextField
                    value={userMinutes}
                    onChange={(e) => setUserMinutes(e.target.value)}
                    onKeyPress={handleKeyPress}
                    type="number"
                    placeholder="MM"
                    disabled={feedback === 'correct'}
                    inputProps={{ min: 0, max: 59 }}
                    sx={{
                      '& input': {
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontWeight: 700,
                        MozAppearance: 'textfield',
                      },
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: 'none',
                          margin: 0,
                        },
                      width: 100,
                    }}
                  />
                </Stack>
              )}

              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={feedback === 'correct'}
                sx={{ minWidth: 200 }}
              >
                {t('common.submit')}
              </Button>
            </Box>

            {feedback === 'correct' && (
              <Alert severity="success" sx={{ mt: 3 }}>
                {t('feedback.correct')} Great time telling! ⏰
              </Alert>
            )}

            {feedback === 'incorrect' && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {t('feedback.incorrect')} The correct answer is{' '}
                {question.answer}
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
