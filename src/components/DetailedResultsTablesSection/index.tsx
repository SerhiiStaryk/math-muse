import { Box, Typography } from '@mui/material';
import { GameResult } from '../GameResult';
import type { GameType, ResultsData } from '@/types';

type DetailedResultsTablesSectionProps = {
  results: ResultsData;
  gameKeys: GameType[];
};

export const DetailedResultsTablesSection = ({ results, gameKeys }: DetailedResultsTablesSectionProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant='h5'
        gutterBottom
        sx={{ fontWeight: 600, mb: 2 }}
      >
        📋 Detailed Results
      </Typography>
      {gameKeys.map(key => (
        <GameResult
          key={key}
          type={key}
          items={results[key]}
        />
      ))}
    </Box>
  );
};
