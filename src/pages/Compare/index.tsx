import { useState, useEffect, useCallback } from 'react';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import { AnswerFeedback } from '@/components';
import { getRandomNumber, recordAttempt } from '@/helpers';
import { useHistory } from '@/hooks';
import { GameType } from '@/types';
import { COMPARE_MAX_NUMBER, FEEDBACK_DISPLAY_DURATION } from '@/constants';

export const ComparePage = () => {
  const [num1, setNum1] = useState<number>(getRandomNumber(COMPARE_MAX_NUMBER));
  const [num2, setNum2] = useState<number>(getRandomNumber(COMPARE_MAX_NUMBER));

  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const { isCorrect, setIsCorrect } = useHistory({
    num1,
    num2,
  });

  const generateNewNumbers = useCallback((): void => {
    setNum1(getRandomNumber(COMPARE_MAX_NUMBER));
    setNum2(getRandomNumber(COMPARE_MAX_NUMBER));
    setSelectedSymbol('');
    setIsCorrect(null);
  }, [setIsCorrect]);

  const handleAnswer = useCallback(
    (answer: 'greater' | 'less' | 'equal', symbol: string): void => {
      setSelectedSymbol(symbol);

      const correctAnswer =
        (num1 > num2 && answer === 'greater') ||
        (num1 < num2 && answer === 'less') ||
        (num1 === num2 && answer === 'equal');

      setIsCorrect(correctAnswer);
      recordAttempt(
        `${num1} ${symbol} ${num2}`,
        correctAnswer,
        GameType.compare
      );
    },
    [num1, num2, setIsCorrect]
  );

  // Auto-generate new numbers after correct answer
  useEffect(() => {
    if (isCorrect === true) {
      const timer = setTimeout(() => {
        generateNewNumbers();
      }, FEEDBACK_DISPLAY_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, generateNewNumbers]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compare the Numbers!
      </Typography>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Typography variant="h2">{num1}</Typography>
            <Box
              width={50}
              height={50}
              border={2}
              mx={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2">{selectedSymbol}</Typography>
            </Box>
            <Typography variant="h2">{num2}</Typography>
          </Box>
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAnswer('greater', '>')}
            >
              &gt;
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAnswer('less', '<')}
              sx={{ mx: 2 }}
            >
              &lt;
            </Button>
            <Button
              variant="contained"
              color="success"
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
