import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { loadResults, clearResults } from '@/helpers';
import { GameType, type ResultsData, type ResultRecord } from '@/types';
import { GameSpecificStatisticsSection } from '@/components/GameSpecificStatisticsSection';
import { MotivationalMessages } from '@/components/MotivationalMessages';
import { DetailedResultsTablesSection } from '@/components/DetailedResultsTablesSection';
import { OverallStatisticsSection } from '@/components/OverallStatisticsSection';
import { DashboardTitle } from './DashboardTitle';
import { NoResults } from './NoResults';
import { AchievementBadgeSection } from '@/components/AchievementBadgeSection';

const DEFAULT_RESULTS: ResultsData = {
  multiply: {},
  divide: {},
  compare: {},
  add: {},
  subtract: {},
  missingNumber: {},
  trueFalse: {},
  numberSequence: {},
  timeChallenge: {},
};

export const DashboardPage = () => {
  const [results, setResults] = useState<ResultsData>(DEFAULT_RESULTS);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    Object.values(GameType).forEach(type => {
      const res = loadResults(type);

      setResults(prev => ({
        ...prev,
        [type]: res ?? {},
      }));
    });
  }, []);

  const stats = useMemo(() => {
    let totalCorrect = 0;
    let totalAttempts = 0;
    let totalMastered = 0;
    const gameStats: Record<GameType, { correct: number; attempts: number; mastered: number }> = {
      add: { correct: 0, attempts: 0, mastered: 0 },
      subtract: { correct: 0, attempts: 0, mastered: 0 },
      multiply: { correct: 0, attempts: 0, mastered: 0 },
      divide: { correct: 0, attempts: 0, mastered: 0 },
      compare: { correct: 0, attempts: 0, mastered: 0 },
      missingNumber: { correct: 0, attempts: 0, mastered: 0 },
      trueFalse: { correct: 0, attempts: 0, mastered: 0 },
      numberSequence: { correct: 0, attempts: 0, mastered: 0 },
      timeChallenge: { correct: 0, attempts: 0, mastered: 0 },
    };

    Object.entries(results).forEach(([gameType, records]) => {
      Object.values(records as Record<string, ResultRecord>).forEach(record => {
        totalCorrect += record.correct;
        totalAttempts += record.attempts;
        gameStats[gameType as GameType].correct += record.correct;
        gameStats[gameType as GameType].attempts += record.attempts;

        if (record.correct >= 5) {
          totalMastered += 1;
          gameStats[gameType as GameType].mastered += 1;
        }
      });
    });

    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    return {
      totalCorrect,
      totalAttempts,
      totalMastered,
      accuracy,
      gameStats,
    };
  }, [results]);

  const handleReset = () => {
    clearResults();
    setResults(DEFAULT_RESULTS);
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
