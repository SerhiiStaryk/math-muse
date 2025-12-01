import type { StatisticsCardType } from './types';

export const STATISTICS_CARD: StatisticsCardType[] = [
  {
    icon: '✅',
    color: 'primary',
    id: 'totalCorrect',
    title: 'statistics.totalCorrect',
  },
  {
    icon: '📝',
    color: 'secondary',
    id: 'totalAttempts',
    title: 'statistics.totalAttempts',
  },
  {
    icon: '🎯',
    id: 'accuracy',
    color: 'success.main',
    title: 'statistics.accuracy',
  },
  {
    icon: '⭐',
    color: 'info.main',
    id: 'totalMastered',
    title: 'statistics.totalMastered',
  },
];
