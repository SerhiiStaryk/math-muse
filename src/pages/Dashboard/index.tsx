import { useState } from 'react';
import { Box } from '@mui/material';
import { GameType } from '@/types';
import { useGameStats } from '@/hooks';
import { GameSpecificStatisticsSection } from '@/components/GameSpecificStatisticsSection';
import { MotivationalMessages } from '@/components/MotivationalMessages';
import { DetailedResultsTablesSection } from '@/components/DetailedResultsTablesSection';
import { OverallStatisticsSection } from '@/components/OverallStatisticsSection';
import { DashboardTitle } from './DashboardTitle';
import { NoResults } from './NoResults';
import { AchievementBadgeSection } from '@/components/AchievementBadgeSection';

export const DashboardPage = () => {
  const { results, stats, clearResults } = useGameStats();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    clearResults();
    setConfirmReset(false);
  };

  const gameKeys = Object.keys(results) as GameType[];
  const hasAnyResults = stats.totalAttempts > 0;

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <DashboardTitle
        confirmReset={confirmReset}
        handleReset={handleReset}
        hasAnyResults={hasAnyResults}
        setConfirmReset={setConfirmReset}
      />

      {!hasAnyResults ? (
        <NoResults />
      ) : (
        <>
          <AchievementBadgeSection stats={stats} />
          <OverallStatisticsSection stats={stats} />
          <GameSpecificStatisticsSection
            results={results}
            stats={stats}
          />
          <MotivationalMessages stats={stats} />
        </>
      )}
      {hasAnyResults && (
        <DetailedResultsTablesSection
          results={results}
          gameKeys={gameKeys}
        />
      )}
    </Box>
  );
};
