import { useState, memo, useCallback, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  LinearProgress,
  Chip,
  Alert,
  Grid,
} from '@mui/material';
import { AnswerFeedback } from '../AnswerFeedback';
import { useSettings } from '@/context/SettingsContext';
import { CustomNumericKeyboard } from '../CustomNumericKeyboard';

type QuestionCardProps = {
  question: string;
  answers?: number[];
  onAnswer: (value: number) => void;
  useMultipleChoice?: boolean;
  isCorrect: boolean | null;
  hint?: string;
};

export const QuestionCard = memo(
  ({ question, answers, onAnswer, isCorrect, useMultipleChoice = true, hint }: QuestionCardProps) => {
    const [inputValue, setInputValue] = useState('');
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(false);
    const { settings } = useSettings();

    const handleInputSubmit = useCallback(() => {
      const value = parseInt(inputValue, 10);

      if (!isNaN(value)) {
        onAnswer(value);
        setInputValue('');
        setShowHint(false);
      }
    }, [inputValue, onAnswer]);

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleInputSubmit();
        }
      },
      [handleInputSubmit]
    );

    const timePercentage =
      timeLeft !== null && settings.timePerQuestion > 0 ? (timeLeft / settings.timePerQuestion) * 100 : 100;

    const isTimeCritical = timeLeft !== null && timeLeft <= 5;

    // Timer logic
    useEffect(() => {
      if (settings.enableTimer && !settings.practiceMode && isCorrect === null) {
        setTimeLeft(settings.timePerQuestion);

        const interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(interval);
              // Auto-submit when time runs out
              if (inputValue && !useMultipleChoice) {
                handleInputSubmit();
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setTimeLeft(null);
      }
    }, [
      settings.enableTimer,
      settings.practiceMode,
      settings.timePerQuestion,
      isCorrect,
      inputValue,
      useMultipleChoice,
      handleInputSubmit,
    ]);

    return (
      <>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            {/* Timer Display */}
            {settings.enableTimer && !settings.practiceMode && timeLeft !== null && (
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography
                    variant='body2'
                    color='text.secondary'
                  >
                    Time Left
                  </Typography>
                  <Chip
                    label={`${timeLeft}s`}
                    color={isTimeCritical ? 'error' : 'primary'}
                    size={settings.largeText ? 'medium' : 'small'}
                  />
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={timePercentage}
                  color={isTimeCritical ? 'error' : 'primary'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            )}

            {/* Practice Mode Indicator */}
            {settings.practiceMode && (
              <Alert
                severity='info'
                sx={{ mb: 2 }}
              >
                🎓 Practice Mode - Take your time!
              </Alert>
            )}

            <Typography
              variant={settings.largeText ? 'h3' : 'h5'}
              gutterBottom
              sx={{
                // fontSize: settings.largeText ? '2.5rem' : '1.5rem',
                fontSize: '2rem',
                fontWeight: 600,
                color: settings.highContrast ? 'text.primary' : 'inherit',
              }}
            >
              {question}
            </Typography>

            {/* Hint Button */}
            {settings.enableHints && hint && !showHint && isCorrect === null && (
              <Button
                variant='outlined'
                size='small'
                onClick={() => setShowHint(true)}
                sx={{ mb: 2 }}
              >
                💡 Show Hint
              </Button>
            )}

            {/* Hint Display */}
            {showHint && hint && (
              <Alert
                severity='success'
                sx={{ mb: 2 }}
              >
                {hint}
              </Alert>
            )}

            {useMultipleChoice && answers ? (
              <Grid
                container
                spacing={2}
                justifyContent='center'
              >
                {answers.map(a => (
                  <Grid
                    size={{ sm: 3, xs: 6 }}
                    key={a}
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => onAnswer(a)}
                      disabled={isCorrect !== null}
                      sx={{
                        width: '100%',
                        minWidth: settings.largeText ? 100 : 80,
                        fontSize: settings.largeText ? '1.5rem' : '1rem',
                        py: settings.largeText ? 2 : 1,
                      }}
                    >
                      {a}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ) : (
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
                  type='text'
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  variant='outlined'
                  placeholder='?'
                  autoFocus
                  size={settings.largeText ? 'medium' : 'small'}
                  disabled={isCorrect !== null}
                  sx={{
                    minWidth: 150,
                    '& input': {
                      maxWidth: 360,
                      fontWeight: 700,
                      textAlign: 'center',
                      // fontSize: settings.largeText ? '1.5rem' : '1rem',
                      fontSize: '2rem',
                      caretColor: 'transparent', // Hide cursor content
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      readOnly: true, // Prevent native keyboard
                      inputMode: 'none',
                    },
                  }}
                />
                <Box sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
                  <CustomNumericKeyboard
                    onInput={num => {
                      if (inputValue.length < 5) {
                        // Limit length
                        setInputValue(prev => prev + num.toString());
                      }
                    }}
                    onBackspace={() => setInputValue(prev => prev.slice(0, -1))}
                    onToggleSign={() => {
                      setInputValue(prev => {
                        if (prev.startsWith('-')) return prev.slice(1);
                        return '-' + prev;
                      });
                    }}
                    onSubmit={handleInputSubmit}
                    // disabled={feedback === 'correct'}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
        <AnswerFeedback isCorrect={isCorrect} />
      </>
    );
  }
);
