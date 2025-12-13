import { useState, useEffect, useMemo, useCallback } from 'react';
import { GameType, type ResultsData, type ResultRecord } from '@/types';
import { loadResults, clearResults as clearStorageResults } from '@/helpers';

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

export const useGameStats = () => {
  const [results, setResults] = useState<ResultsData>(DEFAULT_RESULTS);

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

  const clearResults = useCallback(() => {
    clearStorageResults();
    setResults(DEFAULT_RESULTS);
  }, []);

  return {
    results,
    stats,
    clearResults,
  };
};
