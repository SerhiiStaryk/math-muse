import React, { useState } from 'react';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import { GameHistoryTable, Score, AnswerFeedback } from '@/components';
import { getRandomNumber, recordAttempt } from '@/helpers';
import { useHistory } from '@/hooks';
import { GameType } from '@/types';

export const ComparePage: React.FC = () => {
  const [num1, setNum1] = useState<number>(getRandomNumber(10));
  const [num2, setNum2] = useState<number>(getRandomNumber(10));

  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const { isCorrect, setIsCorrect } = useHistory({
    num1,
    num2,
  });

  const generateNewNumbers = (): void => {
    setNum1(getRandomNumber(10));
    setNum2(getRandomNumber(10));
    setSelectedSymbol('');
    setIsCorrect(null);
  };

  const handleAnswer = (answer: 'greater' | 'less' | 'equal', symbol: string): void => {
    setSelectedSymbol(symbol);

    const correctAnswer =
      (num1 > num2 && answer === 'greater') ||
      (num1 < num2 && answer === 'less') ||
      (num1 === num2 && answer === 'equal');

    setIsCorrect(correctAnswer);
    recordAttempt(`${num1} ${symbol} ${num2}`, correctAnswer, GameType.compare);

    if (correctAnswer) {
      setTimeout(generateNewNumbers, 1000);
    }
  };

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        Compare the Numbers!
      </Typography>
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
              mx={2}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Typography variant='h2'>{selectedSymbol}</Typography>
            </Box>
            <Typography variant='h2'>{num2}</Typography>
          </Box>
          <Box
            mt={3}
            textAlign='center'
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleAnswer('greater', '>')}
            >
              &gt;
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleAnswer('less', '<')}
              sx={{ mx: 2 }}
            >
              &lt;
            </Button>
            <Button
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
