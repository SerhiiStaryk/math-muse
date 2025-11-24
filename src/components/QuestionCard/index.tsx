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
} from '@mui/material';
import { AnswerFeedback } from '../AnswerFeedback';
import { useSettings } from '@/context/SettingsContext';

type QuestionCardProps = {
  question: string;
  answers?: number[];
  onAnswer: (value: number) => void;
  useMultipleChoice?: boolean;
  isCorrect: boolean | null;
  hint?: string;
};

export const QuestionCard = memo(
  ({
    question,
    answers,
    onAnswer,
    isCorrect,
    useMultipleChoice = true,
    hint,
  }: QuestionCardProps) => {
    const [inputValue, setInputValue] = useState('');
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(false);
    const { settings } = useSettings();

    // Timer logic
    useEffect(() => {
      if (
        settings.enableTimer &&
        !settings.practiceMode &&
        isCorrect === null
      ) {
        setTimeLeft(settings.timePerQuestion);

        const interval = setInterval(() => {
          setTimeLeft((prev) => {
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
    ]);

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
      timeLeft !== null && settings.timePerQuestion > 0
        ? (timeLeft / settings.timePerQuestion) * 100
        : 100;

    const isTimeCritical = timeLeft !== null && timeLeft <= 5;

    return (
      <>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            {/* Timer Display */}
            {settings.enableTimer &&
              !settings.practiceMode &&
              timeLeft !== null && (
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Time Left
                    </Typography>
                    <Chip
                      label={`${timeLeft}s`}
                      color={isTimeCritical ? 'error' : 'primary'}
                      size={settings.largeText ? 'medium' : 'small'}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={timePercentage}
                    color={isTimeCritical ? 'error' : 'primary'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              )}

            {/* Practice Mode Indicator */}
            {settings.practiceMode && (
              <Alert severity="info" sx={{ mb: 2 }}>
                🎓 Practice Mode - Take your time!
              </Alert>
            )}

            <Typography
              variant={settings.largeText ? 'h3' : 'h5'}
              gutterBottom
              sx={{
                fontWeight: 600,
                color: settings.highContrast ? 'text.primary' : 'inherit',
              }}
            >
              {question}
            </Typography>

            {/* Hint Button */}
            {settings.enableHints &&
              hint &&
              !showHint &&
              isCorrect === null && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowHint(true)}
                  sx={{ mb: 2 }}
                >
                  💡 Show Hint
                </Button>
              )}

            {/* Hint Display */}
            {showHint && hint && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {hint}
              </Alert>
            )}

            {useMultipleChoice && answers ? (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {answers.map((a) => (
                  <Button
                    key={a}
                    variant="contained"
                    color="primary"
                    onClick={() => onAnswer(a)}
                    disabled={isCorrect !== null}
                    sx={{
                      minWidth: settings.largeText ? 100 : 80,
                      fontSize: settings.largeText ? '1.5rem' : '1rem',
                      py: settings.largeText ? 2 : 1,
                    }}
                  >
                    {a}
                  </Button>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextField
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter your answer"
                  variant="outlined"
                  size={settings.largeText ? 'medium' : 'small'}
                  disabled={isCorrect !== null}
                  sx={{
                    minWidth: 150,
                    '& input': {
                      fontSize: settings.largeText ? '1.5rem' : '1rem',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleInputSubmit}
                  disabled={!inputValue.trim() || isCorrect !== null}
                  sx={{
                    fontSize: settings.largeText ? '1.25rem' : '1rem',
                    py: settings.largeText ? 1.5 : 1,
                  }}
                >
                  Submit
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
        <AnswerFeedback isCorrect={isCorrect} />
      </>
    );
  }
);

QuestionCard.displayName = 'QuestionCard';
