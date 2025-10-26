import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { loadResults, clearResults } from '@/helpers';
import { GameType, type ResultsData } from '@/types';
import { GameResult } from '@/components/GameResult';

const DEFAULT_RESULTS: ResultsData = {
  multiply: {},
  divide: {},
  compare: {},
};

export const DashboardPage = () => {
  const [results, setResults] = useState<ResultsData>(DEFAULT_RESULTS);

  useEffect(() => {
    Object.values(GameType).forEach(type => {
      const res = loadResults(type);

      setResults(prev => ({
        ...prev,
        [type]: res ?? {},
      }));
    });
  }, []);

  const handleReset = () => {
    clearResults();
    setResults(DEFAULT_RESULTS);
  };

  const gameKey = Object.keys(results);

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
      >
        Dashboard
      </Typography>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleReset}
      >
        Reset Results
      </Button>
      {gameKey.map(key => (
        <GameResult
          key={key}
          type={key as GameType}
          items={results[key as GameType]}
        />
      ))}
    </Box>
  );
};
