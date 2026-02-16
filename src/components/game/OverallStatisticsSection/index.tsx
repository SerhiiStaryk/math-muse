import type { Stats } from '@/types';
import Grid from '@mui/material/Grid';
import { STATISTICS_CARD } from './constants';
import { StatisticsCard } from './StatisticsCard';

type OverallStatisticsSectionProps = {
  stats: Stats;
};

export const OverallStatisticsSection = ({ stats }: OverallStatisticsSectionProps) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3 }}
    >
      {STATISTICS_CARD.map(({ icon, color, id, title }) => (
        <StatisticsCard
          key={id}
          id={id}
          icon={icon}
          color={color}
          title={title}
          stats={stats}
        />
      ))}
    </Grid>
  );
};
