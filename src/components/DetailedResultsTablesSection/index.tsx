import { Box, Typography } from '@mui/material';
import { GameResult } from '../GameResult';
import type { GameType, ResultsData } from '@/types';
import { useTranslation } from 'react-i18next';

type DetailedResultsTablesSectionProps = {
  results: ResultsData;
  gameKeys: GameType[];
};

export const DetailedResultsTablesSection = ({ results, gameKeys }: DetailedResultsTablesSectionProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant='h5'
        gutterBottom
        sx={{ fontWeight: 600, mb: 2 }}
      >
        📋 {t('dashboard.detailedRusults')}
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
