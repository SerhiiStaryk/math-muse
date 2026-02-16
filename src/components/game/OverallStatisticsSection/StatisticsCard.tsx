import type { Stats } from '@/types';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type StatisticsCardProps = {
  color: 'primary' | 'secondary' | 'success.main' | 'info.main';
  icon: string;
  id: 'totalCorrect' | 'totalAttempts' | 'accuracy' | 'totalMastered';
  title: string;
  stats: Stats;
};

export const StatisticsCard = ({ icon, stats, id, color, title }: StatisticsCardProps) => {
  const { t } = useTranslation();

  return (
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
            color={color}
            sx={{ fontWeight: 700 }}
          >
            {stats[id]}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
          >
            {`${icon} ${t(title)}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
