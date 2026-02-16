import { useState, useEffect, useCallback } from 'react';
import { Button, Typography, Box, Card, CardContent, useTheme, Stack, Chip } from '@mui/material';
import { AnswerFeedback } from '@/components';
import { useSettings } from '@/context/SettingsContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getRandomNumber, recordAttempt, masteredTasks } from '@/helpers';
import { useHistory } from '@/hooks';
import { GameType } from '@/types';
import { FEEDBACK_DISPLAY_DURATION } from '@/constants';
import { useTranslation } from 'react-i18next';

const buttonStyle = {
  fontSize: '1.5rem',
  fontWeight: 500,
  p: 0,
  pb: 0.5,
};

export const ComparePage = () => {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const theme = useTheme();

  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const { isCorrect, setIsCorrect } = useHistory({
    num1,
    num2,
  });

  const generateNewNumbers = useCallback((): void => {
    const mastered = masteredTasks(GameType.compare);
    const maxValue = settings.maxNumber;
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    while (true) {
      attempts++;
      const n1 = getRandomNumber(maxValue);
      const n2 = getRandomNumber(maxValue);
      const symbol = n1 > n2 ? '>' : n1 < n2 ? '<' : '=';
      const task = `${n1}${symbol}${n2}`;

      if (mastered.has(task) && attempts < MAX_ATTEMPTS) continue;

      setNum1(n1);
      setNum2(n2);
      setSelectedSymbol('');
      setIsCorrect(null);
      break;
    }
  }, [settings.maxNumber, setIsCorrect]);

  const handleAnswer = useCallback(
    (answer: 'greater' | 'less' | 'equal', symbol: string): void => {
      setSelectedSymbol(symbol);

      const correctAnswer =
        (num1 > num2 && answer === 'greater') ||
        (num1 < num2 && answer === 'less') ||
        (num1 === num2 && answer === 'equal');

      setIsCorrect(correctAnswer);
      recordAttempt(`${num1}${symbol}${num2}`, correctAnswer, GameType.compare);

      if (correctAnswer) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    },
    [num1, num2, setIsCorrect]
  );

  useEffect(() => {
    if (isCorrect === true) {
      const timer = setTimeout(() => {
        generateNewNumbers();
      }, FEEDBACK_DISPLAY_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, generateNewNumbers]);

  useEffect(() => {
    generateNewNumbers();
  }, [generateNewNumbers]);

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        {t('games.compare')}
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

      <Card>
        <CardContent>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            mt={3}
          >
            <Typography variant='h2'>{num1}</Typography>
            <Box
              width={50}
              height={50}
              border={2}
              borderColor={theme.palette.primary.main}
              borderRadius={0.5}
              mx={2}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Typography
                variant='h2'
                color={theme.palette.info.main}
                pb={1}
              >
                {selectedSymbol}
              </Typography>
            </Box>
            <Typography variant='h2'>{num2}</Typography>
          </Box>
          <Box
            mt={3}
            display='flex'
            justifyContent='center'
            gap={2}
          >
            <Button
              sx={buttonStyle}
              variant='contained'
              color='primary'
              onClick={() => handleAnswer('greater', '>')}
            >
              &gt;
            </Button>
            <Button
              sx={buttonStyle}
              variant='contained'
              color='secondary'
              onClick={() => handleAnswer('less', '<')}
            >
              &lt;
            </Button>
            <Button
              sx={buttonStyle}
              variant='contained'
              color='success'
              onClick={() => handleAnswer('equal', '=')}
            >
              =
            </Button>
          </Box>
        </CardContent>
      </Card>
      <AnswerFeedback isCorrect={isCorrect} />
    </Box>
  );
};
