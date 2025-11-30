import { Box, Grid } from '@mui/material';
import type { GameStats } from '@/types';
import { loadResults } from '@/helpers';
import { useEffect, useState } from 'react';
import { GAME_CARDS } from './constants';
import { GameSectionTitle } from './GameSectionTitle';
import { GameCard } from './GameCard';

export const GameSection = () => {
  const [gameStats, setGameStats] = useState<GameStats>({});

  useEffect(() => {
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

    setGameStats(stats);
  }, []);

  return (
    <Box sx={{ mb: 5 }}>
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
