import { Typography, Card, CardContent, Grid } from '@mui/material';
import type { GameType, Stats, ResultsData } from '@/types';
import { GameStatCard } from './GameStatCard';

export type GameSpecificStatisticsSectionProps = {
  results: ResultsData;
  stats: Stats;
};

export const GameSpecificStatisticsSection = ({ results, stats }: GameSpecificStatisticsSectionProps) => {
  const gameKeys = Object.keys(results) as GameType[];

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          🎮 Game Breakdown
        </Typography>
        <Grid
          container
          spacing={2}
        >
          {gameKeys.map(gameType => {
            const gameStat = stats.gameStats[gameType];
            const gameAccuracy = gameStat.attempts > 0 ? Math.round((gameStat.correct / gameStat.attempts) * 100) : 0;

            return (
              <GameStatCard
                key={gameType}
                gameType={gameType}
                gameStat={gameStat}
                gameAccuracy={gameAccuracy}
              />
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
