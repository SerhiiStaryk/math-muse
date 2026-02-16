import { Box, Grid } from '@mui/material';
import type { GameStats } from '@/types';
import { loadResults } from '@/helpers';
import { useMemo } from 'react';
import { GAME_CARDS } from './constants';
import { GameSectionTitle } from './GameSectionTitle';
import { GameCard } from './GameCard';

export const GameSection = () => {
  const gameStats = useMemo(() => {
    const stats: GameStats = {};

    GAME_CARDS.forEach(game => {
      if (game.gameType) {
        const results = loadResults(game.gameType);
        const resultsArray = Object.values(results);
        const total = resultsArray.length;
        const mastered = resultsArray.filter(r => r.correct >= 5).length;

        stats[game.gameType] = { total, mastered };
      }
    });

    return stats;
  }, []);

  return (
    <Box mb={5}>
      <GameSectionTitle />
      <Grid
        container
        spacing={3}
      >
        {GAME_CARDS.map(game => (
          <GameCard
            game={game}
            gameStats={gameStats}
          />
        ))}
      </Grid>
    </Box>
  );
};
