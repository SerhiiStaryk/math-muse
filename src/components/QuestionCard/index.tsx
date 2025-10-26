import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField } from '@mui/material';
import { AnswerFeedback } from '../AnswerFeedback';

type QuestionCardProps = {
  question: string;
  answers?: number[];
  onAnswer: (value: number) => void;
  useMultipleChoice?: boolean;
  isCorrect: boolean | null;
};

export const QuestionCard = ({
  question,
  answers,
  onAnswer,
  isCorrect,
  useMultipleChoice = true,
}: QuestionCardProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputSubmit = () => {
    const value = parseInt(inputValue, 10);

    if (!isNaN(value)) {
      onAnswer(value);
      setInputValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            variant='h5'
            gutterBottom
          >
            {question}
          </Typography>
          {useMultipleChoice && answers ? (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              {answers.map(a => (
                <Button
                  key={a}
                  variant='contained'
                  color='primary'
                  onClick={() => onAnswer(a)}
                >
                  {a}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                type='number'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Enter your answer'
                variant='outlined'
                size='medium'
                sx={{ minWidth: 150 }}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleInputSubmit}
                disabled={!inputValue.trim()}
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
};
