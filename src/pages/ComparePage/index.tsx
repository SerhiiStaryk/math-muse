import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { GameHistoryTable, Score, AnswerFeedback } from '@/components';
import { getRandomNumber } from '@/helpers';
import { useHistory } from '@/hooks';

const ComparePage: React.FC = () => {
  const [num1, setNum1] = useState<number>(getRandomNumber(10));
  const [num2, setNum2] = useState<number>(getRandomNumber(10));

  const [selectedSymbol, setSelectedSymbol] = useState<string>('');

  const { score, setScore, attempts, history, isCorrect, setIsCorrect, handleSetHistory } = useHistory({
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
    handleSetHistory(correctAnswer, symbol);

    if (correctAnswer) {
      setScore(prev => prev + 1);
      setTimeout(generateNewNumbers, 1000);
    }
  };

  return (
    <Box
      textAlign='center'
      mt={5}
    >
      <Typography variant='h4'>Compare the Numbers!</Typography>
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
      <Box mt={3}>
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
      <AnswerFeedback isCorrect={isCorrect} />
      <Score
        score={score}
        attempts={attempts}
      />
      <GameHistoryTable history={history} />
    </Box>
  );
};

export default ComparePage;
