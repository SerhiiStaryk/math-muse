import type { GameType } from '@/types';
import { Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';

type OverallStatisticsSectionProps = {
  stats: {
    totalCorrect: number;
    totalAttempts: number;
    totalMastered: number;
    accuracy: number;
    gameStats: Record<
      GameType,
      {
        correct: number;
        attempts: number;
        mastered: number;
      }
    >;
  };
};

export const OverallStatisticsSection = ({ stats }: OverallStatisticsSectionProps) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <Card sx={{ textAlign: 'center', height: '100%' }}>
          <CardContent>
            <Typography
              variant='h3'
              color='primary'
              sx={{ fontWeight: 700 }}
            >
              {stats.totalCorrect}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
            >
              ✅ Correct Answers
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <Card sx={{ textAlign: 'center', height: '100%' }}>
          <CardContent>
            <Typography
              variant='h3'
              color='secondary'
              sx={{ fontWeight: 700 }}
            >
              {stats.totalAttempts}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
            >
              📝 Total Attempts
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <Card sx={{ textAlign: 'center', height: '100%' }}>
          <CardContent>
            <Typography
              variant='h3'
              color='success.main'
              sx={{ fontWeight: 700 }}
            >
              {stats.accuracy}%
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
            >
              🎯 Accuracy
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 3,
        }}
      >
        <Card sx={{ textAlign: 'center', height: '100%' }}>
          <CardContent>
            <Typography
              variant='h3'
              color='info.main'
              sx={{ fontWeight: 700 }}
            >
              {stats.totalMastered}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
            >
              ⭐ Mastered Problems
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
